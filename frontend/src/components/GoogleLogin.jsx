import React from 'react'

function GoogleLogin() {
  return (
    <>
    <div className="col-sm-4">
  <div className="card social-block">
    <div className="card-body">
      <a className="btn btn-block" href="http://localhost:8000/auth/google" role="button">
        <i className="fab fa-google"></i>
        Sign Up with Google
      </a>
    </div>
  </div>
</div>
</>
  )
}

export default GoogleLogin
