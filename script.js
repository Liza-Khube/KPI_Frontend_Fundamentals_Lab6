const DOMElems = {
  personInfo: document.getElementById('person-info'),
  errorContainer: document.getElementById('error'),
  button: document.getElementById('get-person'),
  userPhoto: document.getElementById('user-photo'),
  userCell: document.getElementById('user-cell'),
  userCountry: document.getElementById('user-country'),
  userPostcode: document.getElementById('user-postcode'),
  userCoordinates: document.getElementById('user-coordinates'),
  spinnerOverlay: document.getElementById('loading-overlay'),
};

async function getUserData() {
  const url = 'https://randomuser.me/api';
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`response status ${response.status}`);
  }
  const data = await response.json();
  return data.results[0];
}

function toggleLoading(isLoading) {
  DOMElems.button.disabled = isLoading;
  if (isLoading) {
    DOMElems.spinnerOverlay.classList.add('show');
    DOMElems.personInfo.classList.add('show');
  } else {
    DOMElems.spinnerOverlay.classList.remove('show');
  }
}

function addUserData(userData) {
  DOMElems.userPhoto.src = userData.picture.large;
  DOMElems.userCell.textContent = userData.cell;
  DOMElems.userCountry.textContent = userData.location.country;
  DOMElems.userPostcode.textContent = userData.location.postcode;
  DOMElems.userCoordinates.textContent = `${userData.location.coordinates.latitude}, ${userData.location.coordinates.longitude}`;
}

function showError(message) {
  console.error(`Can not get user: ${message}`);
  DOMElems.personInfo.classList.remove('show');
  DOMElems.errorContainer.classList.add('show');
}

function hideError() {
  if (DOMElems.errorContainer.classList.contains('show')) {
    DOMElems.errorContainer.classList.remove('show');
  }
}

document.getElementById('get-person').addEventListener('click', async () => {
  hideError();
  toggleLoading(true);
  try {
    const userData = await getUserData();
    addUserData(userData);
    console.log('Get user success');
  } catch (error) {
    showError(error.message);
  } finally {
    toggleLoading(false);
  }
});
