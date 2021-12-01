import './App.css';
import React from 'react';


class Modal extends React.Component {
  render() {
    return (

      <div>Lista de Productos

        {this.props.Details.lista.map((article, index) => (
          <div key={index}>
            <p>{article.article.name} - ${article.article.price} <span onClick={() => this.props.Details.delete(index)}>❌</span></p>
          </div>
        ))}

      </div>


    )
  }


}



class Article extends React.Component {


  //https://foodish-api.herokuapp.com/images/biryani/biryani2.jpg
  render() {
    return (
      <div>
        <label id={this.props.indice}>{this.props.details.name}</label>
        <img className="imagen" src={this.props.details.img} alt="platillo"></img>
        <label>${this.props.details.price}</label><br />
        <button onClick={() => this.props.send(this.props.indice)}>Agregar</button>
      </div>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      lista: [],
      send: this.send,
      delete: this.delete,
      showModal: true
    };
  }



  componentDidMount() {
    let articles = [];
    const axios = require('axios');
    const promiseArr = []
    for (let i = 1; i < 13; i++) {
      promiseArr.push(axios(`https://foodish-api.herokuapp.com/api/`))
    }
    Promise.all(promiseArr)
      .then(response => response.map(
        (res, index) => articles.push({
          img: res.data.image, name: `Platillo ${index + 1}`, indice: index + 1, price: Math.floor(1 + Math.random() * 100)
        })

      ))
      .then(res => this.setState({ articles: articles }))

  }

  send = (indice) => {
    let articleadded = {}
    /*  let article = document.getElementById(index).innerHTML; */
    this.state.articles.forEach((article) => {
      if (article.indice === indice)
        articleadded = article
      return articleadded
    })
    let lista = this.state.lista;
    lista.push({ article: articleadded })
    this.setState({ lista: lista });
  }

  delete = (index) => {

    let lista = this.state.lista;
    lista.splice(index, 1)
    this.setState({ lista: lista });


  }

  handleCloseModal = () => {
    this.setState({ showModal: !this.state.showModal });
    var button = document.getElementById('listado');
    if (button.innerHTML === 'Ver lista')
      button.innerHTML = 'Cerrar Lista';
    else button.innerHTML = 'Ver lista';
  };

  render() {
    let modal;
    if (this.state.showModal) {
      modal = <Modal Details={this.state} />
    } else {
      modal = null;
    }
    return (
      <div className="App">
        <label>Articulo: </label>
        <input id="article_name" type="text" placeholder="" />
        <label>Precio</label>
        <input id="precio" type="text" placeholder="" />
        <button onClick={this.addArticle}>Agregar</button>

        {/* <div>
          {this.state.articles.map((article, index) => (
            <Article nombre = {article.article} precio = {article.precio}/>
          ))}
        </div> */}

        <div className="container">
          <div className="grid">
            {this.state.articles.map((article, index) => (
              <div key={index}>
                <Article
                  details={article} key={index + 1} indice={index + 1} send={this.state.send}
                />

              </div>
            ))}

          </div>


        </div>
        <div className="lista">
          <button id="listado" onClick={this.handleCloseModal}>Cerrar lista</button>
          {modal}
        </div>
      </div>


    )
  }

}

