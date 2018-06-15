function responseToList (response, idKey='id') {
  const data = response.data
  return data ? Object.entries(data).map(putKeyOnObject) : []
}

function putKeyOnObject ([firebaseKey, firebaseObject]) {
  return {
    id: firebaseKey,
    ...firebaseObject
  }
}

export default {
  responseToList,
  putKeyOnObject
}
