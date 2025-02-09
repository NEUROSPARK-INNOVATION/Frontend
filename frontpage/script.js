// Add this to your CSS file
document.addEventListener("DOMContentLoaded", () => {
    // Mobile menu toggle
    const menuToggle = document.querySelector(".menu-toggle")
    const navLinks = document.querySelector(".nav-links")
  
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active")
    })
  
    // Close menu when a link is clicked
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active")
      })
    })
  
    // Scroll animation for content sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1 },
    )
  
    document.querySelectorAll(".content-section").forEach((section) => {
      observer.observe(section)
    })
  
    // Dynamic book search
    const searchInput = document.querySelector(".search-bar input")
    const searchButton = document.querySelector(".search-bar button")
    const bookCards = document.querySelectorAll(".book-card")
  
    const performSearch = () => {
      const searchTerm = searchInput.value.toLowerCase()
      bookCards.forEach((card) => {
        const title = card.querySelector("h3").textContent.toLowerCase()
        const author = card.querySelector("p").textContent.toLowerCase()
        if (title.includes(searchTerm) || author.includes(searchTerm)) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }
      })
    }
  
    searchButton.addEventListener("click", performSearch)
    searchInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        performSearch()
      }
    })
    // Dynamic notice board
    const noticeBoard = document.querySelector("#notice-board .notice")
    const notices = [
      { title: "Library Closure", content: "The library will be closed on May 30th for maintenance." },
      { title: "New Database Access", content: "We now have access to the Science Direct database. Check it out!" },
      { title: "Book Sale", content: "Annual book sale starts next week. Don't miss out on great deals!" },
    ]
    let currentNoticeIndex = 0
  
    function updateNotice() {
      const notice = notices[currentNoticeIndex]
      noticeBoard.innerHTML = `
              <h3>${notice.title}</h3>
              <p>${notice.content}</p>
          `
    }
  
    updateNotice()
  
    setInterval(() => {
      currentNoticeIndex = (currentNoticeIndex + 1) % notices.length
      updateNotice()
    }, 10000)
  
    // Expandable genre cards
    const genreCards = document.querySelectorAll(".genre-card")
    genreCards.forEach((card) => {
      card.addEventListener("click", () => {
        card.classList.toggle("expanded")
        if (card.classList.contains("expanded")) {
          const genreName = card.querySelector("h3").textContent
          fetch(`https://openlibrary.org/subjects/${genreName.toLowerCase()}.json?limit=5`)
            .then((response) => response.json())
            .then((data) => {
              const bookList = data.works.map((book) => `<li>${book.title}</li>`).join("")
              card.innerHTML += `
                              <ul class="genre-books">
                                  ${bookList}
                              </ul>
                          `
            })
            .catch((error) => {
              console.error("Error fetching genre books:", error)
            })
        } else {
          const bookList = card.querySelector(".genre-books")
          if (bookList) {
            card.removeChild(bookList)
          }
        }
      })
    })
  
    // Add to reading list functionality
    const addToReadingListButtons = document.querySelectorAll(".add-to-reading-list")
    addToReadingListButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault()
        const bookTitle = button.closest(".book-card").querySelector("h3").textContent
        alert(`Added "${bookTitle}" to your reading list!`)
      })
    })
  })
  //count visitors
  document.addEventListener("DOMContentLoaded", function() {
         
    if (!sessionStorage.getItem("hasVisitedHome")) {
   
        
        var visitCount = localStorage.getItem("home_visit_count");

        if (visitCount) {
            visitCount = Number(visitCount) + 1; 
        } else {
            visitCount = 1;
        }

        localStorage.setItem("home_visit_count", visitCount);

        sessionStorage.setItem("hasVisitedHome", "true");
    }
});