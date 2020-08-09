const createUserRankTemplate = (user) => {
  const {userRank, imageSrc} = user;

  return `<section class="header__profile profile">
      <p class="profile__rating">${userRank}</p>
      <img class="profile__avatar"
        src="${imageSrc}"
        alt="Avatar"
        width="35" height="35"
      />
    </section>`
  ;
};

export {createUserRankTemplate};
