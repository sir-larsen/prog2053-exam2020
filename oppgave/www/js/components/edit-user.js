import { LitElement, html, css } from "../../node_modules/lit-element/lit-element.js";

class EditUser extends LitElement {
  static get properties() {
    return {
      user: { type: Object }
    };
  }

  // din kode her
  async getInfo() {
    await fetch(`api/fetchUser.php`, {
            method: 'GET',
            credentials: 'include'
            }).then ( res => res.json()).then (data => {
                console.log("Authenticated user: " + JSON.stringify(data) );
                this.user.id = data.uid;
                this.user.email = data.email;
                this.user.name = data.name;
            })
  }

  editUser() {
    var nameData = this.shadowRoot.getElementById('name').value;
    var emailData = this.shadowRoot.getElementById('email').value;
    var passwordData1 = this.shadowRoot.getElementById('password1').value;
    var passwordData2 = this.shadowRoot.getElementById('password2').value;
    var data = {
      uid : this.id,
      email: emailData,
      name: nameData
    }
    if(passwordData1 === passwordData2) {
      this.shadowRoot.getElementById('passErr').style.display='none';
      data.password = passwordData1;
    } 
    else {
      this.shadowRoot.getElementById('passErr').style.display='block';
      return
    }
    
    await fetch(`api/updateUser.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  
      },
      body: JSON.stringify(data),

        }).then(res => res.json())
        .then(data => {console.log("Success", data);
      }).catch((error) => {console.error("Error in post")})
    console.log(data.email)
  }

}
customElements.define('edit-user', EditUser);
