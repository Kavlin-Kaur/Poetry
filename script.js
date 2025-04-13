// Common functionality for the poetry website

// Helper function to format dates
function formatDate(date) {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(date).toLocaleDateString("en-US", options)
  }
  
  // Helper function to create toast notifications
  function showToast(message, type = "success") {
    const toastContainer = document.createElement("div")
    toastContainer.className = "position-fixed bottom-0 end-0 p-3"
    toastContainer.style.zIndex = "11"
  
    const toastEl = document.createElement("div")
    toastEl.className = `toast align-items-center text-white bg-${type} border-0`
    toastEl.setAttribute("role", "alert")
    toastEl.setAttribute("aria-live", "assertive")
    toastEl.setAttribute("aria-atomic", "true")
  
    toastEl.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `
  
    toastContainer.appendChild(toastEl)
    document.body.appendChild(toastContainer)
  
    const toast = new bootstrap.Toast(toastEl, {
      autohide: true,
      delay: 5000,
    })
  
    toast.show()
  
    // Remove from DOM after hiding
    toastEl.addEventListener("hidden.bs.toast", () => {
      document.body.removeChild(toastContainer)
    })
  }
  
  