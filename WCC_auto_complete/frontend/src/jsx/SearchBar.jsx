import React, { Component } from 'react';
import '../css/Search.css';
import Search from '../images/search.png';
import SearchHeart from '../images/searchHeart.png';
import Delete from '../images/delete.png';
import axios from 'axios';



class SearchBar extends Component {

  // constructor for the class SearchBar
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      search_before: [],
      suggestions: [],
      showSuggestions: false,
      searchResults: [],
    };
  }

   //mount the data when the page is loading
   componentDidMount() {
    this.fetchData();
  }


  //handle the search to google
  
  
  handleSearch = async () => {
    const { searchValue } = this.state;
  
    try {
      // Perform the request to get the search results
      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1?key=AIzaSyDuykIw1_2Efmtq4bx6eCiqUuAKsgM6TP4&cx=571e7d78355bf4957&q=${searchValue}&searchType=image`
      );
      const searchResults = response.data.items.map((item) => {
        return {
          title: item.title,
          description: item.snippet,
          image: item.link,
        };
      });
  
      // Update the state with the search results
      this.setState({ searchResults });
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
 
  //get the value from the database postgresql
  fetchData = () => {
    fetch('http://localhost:8080/get-data')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ search_before: data }, () => {
          // Appeler la logique de filtrage des suggestions ici
          const { searchValue, search_before } = this.state;
  
          if (searchValue.trim() === '') {
            this.setState({ suggestions: [], showSuggestions: false });
          } else {
            const suggestions = search_before.filter(
              (item) =>
                item &&
                item.search_value &&
                typeof item.search_value === 'string' &&
                this.calculateLevenshteinDistance(item.search_value.toLowerCase(), searchValue.toLowerCase()) <= 15
            );
  
            this.setState({ suggestions, showSuggestions: true });
          }
        });
        console.log(this.state.search_before);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  };

 // Fonction de distance de Levenshtein
  calculateLevenshteinDistance = (str1, str2) => {
    const m = str1.length;
    const n = str2.length;
  
    // Créer une matrice de distances
    const dp = [];
    for (let i = 0; i <= m; i++) {
      dp[i] = [];
      dp[i][0] = i;
    }
    for (let j = 0; j <= n; j++) {
      dp[0][j] = j;
    }
  
    // Calculer la distance de Levenshtein
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1, // Suppression
          dp[i][j - 1] + 1, // Insertion
          dp[i - 1][j - 1] + cost // Substitution
        );
      }
    }
  
    // Afficher les valeurs intermédiaires pour le débogage
    console.log('str1:', str1);
    console.log('str2:', str2);
    console.log('dp:', dp);
  
    // Retourner la distance de Levenshtein
    return dp[m][n];
  };
  
  handleInputChange = (event) => {
    const value = event.target.value;
    const { search_before } = this.state;
  
    if (value.trim() === '') {
      this.setState({ searchValue: value, suggestions: [], showSuggestions: false });
    } else {
      const suggestions = search_before.filter(
        (item) =>
          item &&
          item.search_value &&
          typeof item.search_value === 'string' &&
          this.calculateLevenshteinDistance(item.search_value.toLowerCase(), value.toLowerCase()) >= 0
      );
  
      this.setState({ searchValue: value, suggestions, showSuggestions: true });
    }
  };

  handleSuggestionClick = (suggestion) => {
    this.setState({ searchValue: suggestion, suggestions: [], showSuggestions: false });
  };

  // DELETE THE SUGGESTION
  handleSuggestionDeleteClick = async (suggestion) => {
    const { search_before, suggestions } = this.state;

    // Supprimer la suggestion de l'état search_before
    const updatedSearchBefore = search_before.filter(
      (item) => item.search_value !== suggestion
    );
  
    // Mettre à jour l'état search_before
    this.setState({ search_before: updatedSearchBefore });
  
    // Supprimer la suggestion de l'état suggestions
    const updatedSuggestions = suggestions.filter(
      (item) => item.search_value !== suggestion
    );
  
    // Mettre à jour l'état suggestions
    this.setState({ suggestions: updatedSuggestions });
  
    // Supprimer la suggestion de la base de données (utilisez votre logique de suppression appropriée)
    try {
      const response = await fetch('http://localhost:8080/delete-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchValue: suggestion }),
      });
  
      if (response.ok) {
        console.log('Suggestion supprimée avec succès');
      } else {
        console.error('Erreur lors de la suppression de la suggestion');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la suggestion:', error);
    }
  };




  //handle on the submit
  handleSubmit = async (event) => {
    event.preventDefault(); // avoid the loading page
    this.handleSearch();
    const searchValue = this.state.searchValue;
  
    if (searchValue) {
      try {
        const response = await fetch('http://localhost:8080/insert-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ searchValue }),
        });
  
        if (response.ok) {
          console.log('Données insérées avec succès');
          // Effectuer d'autres actions après l'insertion réussie
          this.fetchData();
        } else {
          console.error("Erreur lors de l'insertion des données");
        }
      } catch (error) {
        console.error("Erreur lors de la requête d'insertion des données:", error);
      }
    }
  
    this.setState({ searchValue: '', suggestions: [], showSuggestions: false });
  };



  

  renderDropdown = () => {
    const { suggestions, showSuggestions } = this.state;
  
    if (showSuggestions && suggestions.length > 0) {
      return (
        <ul className="dropdown">
          {suggestions.map((item, index) => (
            <li className="dropdown-item" key={index} onClick={() => this.handleSuggestionClick(item.search_value)}>
              <button type="button" className="btn btn-search">
                <img src={SearchHeart} alt="Search icon" className="icon" />
              </button>
              <div className="textSearch">{item.search_value}</div>
              <button type="button" className="btn btn-search" 
               onClick={(e) => {
                e.stopPropagation();
                // Add your action code here
                this.handleSuggestionDeleteClick(item.search_value)
              }}
              
              >
                
                <img src={Delete} alt="Search icon" className="icon" />
              </button>
            </li>
          ))}
        </ul>
      );
    } else {
      return null;
    }
  };
  
  render() {
    const { searchValue , searchResults} = this.state;

    return (
      <div className="container">
        <div>
        <form className="input-group " onSubmit={this.handleSubmit}>
          <div className="form-outline ">
            <input
              type="search"
              name="search"
              id="form1"
              className="form-control"
              value={searchValue}
              onChange={this.handleInputChange}
            />
            <label className="form-label" htmlFor="form1">
              Search
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            <img src={Search} alt="Search icon" className="flaticon" />
          </button>
        </form>
        {this.renderDropdown()}
          
        </div>


        <div className="resultat">
        <h2 className='resultatTitle'>Resultat de la recherche :</h2>
        <div className="elements">
          {searchResults.map((result, index) => (
              <div key={index}  className='element'>
                <div>
                  {result.image && (
                  <img src={result.image} alt="Result Thumbnail" />
                  )}
               
                  <h3>{result.title}</h3>
                  <p>{result.description}</p>
                </div>
               
                
                
              </div>
          ))}
        </div>
      </div>
        
      </div>
    );
  }
}

export default SearchBar;
