import "../scss/index.scss";

$(document).ready(function () {
  // Copyright Text
  $("#copyright-year").text(new Date().getFullYear());

  var contactForm = $("#submit-now");
  contactForm.click(function (event) {
    event.preventDefault();
    var nameInput = $("#name");
    var emailInput = $("#email");
    var interestedInput = $("#interested");
    var isNameValid = false;
    var isEmailValid = false;
    var interestedValid = false;
    var formData = document.getElementById("contact-form");
    if ((nameInput.val() || "").length <= 0) {
      nameInput.attr("class", "form-input invalid-input");
    } else {
      isNameValid = true;
      nameInput.attr("class", "form-input");
    }

    if ((emailInput.val() || "") <= 0) {
      emailInput.attr("class", "form-input invalid-input");
    } else {
      if (
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
          emailInput.val()
        )
      ) {
        isEmailValid = true;
        emailInput.attr("class", "form-input");
      } else {
        emailInput.attr("class", "form-input invalid-input");
      }
    }

    if ((interestedInput.val() || "").length <= 0) {
      interestedInput.attr("class", "form-input invalid-input");
    } else {
      interestedValid = true;
      interestedInput.attr("class", "form-input");
    }

    if (isNameValid && isEmailValid && interestedValid) {
      $("#form-spinner").show();
      contactForm.attr("disabled", true);

      $.ajax({
        type: formData.method,
        url: formData.action,
        data: JSON.stringify({
          name: $("#name").val(),
          phone: $("#phone").val(),
          email: $("#email").val(),
          interested: $("#interested").val(),
          message: $("#messages").val(),
        }), // now data come in this function
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        dataType: "json",
        success: function (data, status, jqXHR) {
          $("#form-spinner").hide();
          $("#my-form-status").html(
            `<div class="success-animation">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 130.2 130.2"
                  class="success-cross"
                >
                  <circle
                    class="path circle"
                    fill="none"
                    stroke="#73AF55"
                    stroke-width="6"
                    stroke-miterlimit="10"
                    cx="65.1"
                    cy="65.1"
                    r="62.1"
                  />
                  <polyline
                    class="path check"
                    fill="none"
                    stroke="#73AF55"
                    stroke-width="6"
                    stroke-linecap="round"
                    stroke-miterlimit="10"
                    points="100.2,40.2 51.5,88.8 29.8,67.5 "
                  />
                </svg>
              </div>
              <div>
                Thank you for your submission 🙌. Our team will
                be in touch with you soon.
              </div>`
          );
          setTimeout(() => {
            $("#my-form-status").html("");
          }, 5000);
          $("#name").val("");
          $("#phone").val("");
          $("#email").val("");
          $("#interested").val("");
          $("#messages").val("");
        },
        error: function (jqXHR, status) {
          $("#form-spinner").hide();
          // error handler
          console.log(jqXHR);
          alert("fail" + status.code);
        },
        complete: function () {
          contactForm.removeAttr("disabled");
        },
      });
    }
  });
});

AOS.init({
  duration: 1000,
  offset: 120,
  easing: "ease-in-out",
});
