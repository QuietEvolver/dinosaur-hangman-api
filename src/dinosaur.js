export class Dinosaurs {
    getDinosaurs(getDinos) {
      return new Promise(function(resolve, reject) {
        let data = null;
        let request = new XMLHttpRequest();
        
        const url = `https://alexnormand-dino-ipsum.p.rapidapi.com/?<p>=" "`; //&format=html&words=10&paragraphs=5
 //       request.withCredentials = true; // Does this need to be in/out of the fx(req.onload)
        request.onload = function() {
          if (this.status === 200) {
            resolve(request.response);
           let that = this;
         // split method will split a string obj to array of strings
          let word = this.word.split("");
          let output = "";
            word.forEach(function(letter, index) {
              //show the response separated by display space
              (output += that.letters[index]), display();
          });
          // console.log(output + "\n");
          } else {
            reject(Error(request.statusText));
          }
        }
        request.open("GET", url);//, true);
        request.setRequestHeader("x-rapidapi-host", "alexnormand-dino-ipsum.p.rapidapi.com");
        request.setRequestHeader("x-rapidapi-key", "process.env.API_KEY");
        request.send(data);
      });
    }
}



/* Authors
  function createNode(element) {
      return document.createElement(element);
  }

  function append(parent, el) {
    return parent.appendChild(el);
  }

  const ul = document.getElementById('authors');
  const url = 'https://randomuser.me/api/?results=10';
  fetch(url)
  .then((resp) => resp.json())
  .then(function(data) {
    let authors = data.results;
    return authors.map(function(author) {
      let li = createNode('li'),
          img = createNode('img'),
          span = createNode('span');
      img.src = author.picture.medium;
      span.innerHTML = `${author.name.first} ${author.name.last}`;
      append(li, img);
      append(li, span);
      append(ul, li);
    })
  })
  .catch(function(error) {
    console.log(JSON.stringify(error));
  });   

*/


