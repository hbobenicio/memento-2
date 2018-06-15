export default function(optionsList) {
  return (value) => optionsList.indexOf(value) !== -1
}
