// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
const ul = document.querySelector("#quote-list")



fetch(`http://localhost:3000/quotes?_embed=likes`)
.then((resp) => {
  return resp.json()
})
.then((quotesArray) => {
  renderAllQuotes(quotesArray)
})

function turnQuoteToHtml(quote){
  let outEleLi = document.createElement("li")
  outEleLi.className = "quote-card"
  outEleLi.innerHTML= `<blockquote class="blockquote">
      <p class="mb-0">${quote.quote}</p>
      <footer class="blockquote-footer">${quote.author}</footer>
      <br>
      <button class='btn-success'>Likes: <span>${quote.likes.length}</span></button>
      <button class='btn-danger'>Delete</button>
    </blockquote>`
ul.append(outEleLi)

//-------------------------Delete Button -----------------------------//
  const delButton = outEleLi.querySelector(".btn-danger")

    delButton.addEventListener("click", (evt) => {
      fetch(`http://localhost:3000/quotes/${quote.id}`, {
        method: "DELETE"
      })
      .then((resp) => {
        return resp.json()
      })
      .then(() => {
        outEleLi.remove()
      })
    }) // end of delButton

//---------------------------Like Button ------------------------------//

const likeButton = outEleLi.querySelector(".btn-success")
console.log(likeButton);
  likeButton.addEventListener("click", (evt) => {

    fetch(`http://localhost:3000/likes`, {
      method: "POST",
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quoteId : quote.id
      })
    })
    .then((resp) => {
      return resp.json()
    })
    .then((likeObj) => {
      quote.likes.push(likeObj)
      let span = outEleLi.querySelector("span")
      span.innerText = quote.likes.length
    })


  })














}// end of function







function renderAllQuotes(quotesArray){
  quotesArray.forEach((quote) => {
    turnQuoteToHtml(quote)
  })
}
