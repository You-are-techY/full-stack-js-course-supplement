import _ from 'lodash';
import { DateTime } from 'luxon';

const displayUtils = {

  getInitials(user) {
    if(user.firstname) {
      return user.firstname.charAt(0).toUpperCase() + user.lastname.charAt(0).toUpperCase();
    } else if(user.username) {
      return user.username.charAt(0).toUpperCase();
    } else {
      return "?"
    }
  }

  , getUserColorBG(user) {
    const colorMap = {
        0: "#f39a88" 
      , 1: "#F1910E" 
      , 2: "#D26D87" 
      , 3: "#C096CA" 
      , 4: "#F5684D" 
      , 5: "#0DA79D" 
      , 6: "#4EBAC5" 
      , 7: "#4b4b4b" 
      , 8: "#8CC63F" 
    }
    let h = (DateTime.fromISO(user._created).hour + 1) % 8;
    return colorMap[h];
  }
  
}

export default displayUtils;