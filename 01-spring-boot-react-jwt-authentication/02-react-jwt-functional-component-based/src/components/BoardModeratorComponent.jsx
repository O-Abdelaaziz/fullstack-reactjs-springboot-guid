import React, { useEffect, useState } from 'react'
import authenticationUserService from '../services/authentication.user.service';

const BoardModeratorComponent = () => {
    const [content, setContent] = useState("");

  useEffect(() => {
    authenticationUserService.getModeratorContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
}

export default BoardModeratorComponent
