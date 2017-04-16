export const getTextParts = text => {  
  const match = text.match(/#(.*?)#/)    
  return match 
    ? [text.substr(0, match.index), match[1], text.substr(match.index + match[0].length)] 
    : [text]
}
