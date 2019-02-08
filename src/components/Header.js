import React from 'react'

export const Header = ({ name, description, homepageUrl, avatarUrl }) => (
  <header>
    <span>
      {avatarUrl && <img src={avatarUrl} alt="" />}
      <span>
        <h1>
          {homepageUrl ? <a href={homepageUrl}>{name}</a> : name} changelog
        </h1>
        <p>{description}</p>
      </span>
    </span>
  </header>
)
