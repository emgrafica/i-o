import {MY_STUFF} from '../../constants'
import {sortByFieldNameDesc} from './../../utils/sort';
import { PC_REF_STATUS } from "../../constants/pcRefreshConstants";
import noImageLaptop from '../../assets/images/empty/emptyLaptop01-removebg-preview.png';
import noImageDesktop from '../../assets/images/empty/emptyDesktop01-removebg-preview.png';
import { truncateString } from 'services/api';


const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


const defaultState = {
    isLoading: true,
    error: null,
    data: [],
    userId: "",
    isFinished: false,
    isSelected: "",
    deviceIsRefreshed:[]
  };

  const convertDateToStringDateMonthAndYear = (sinceParm) => {
    let since = new Date(sinceParm);
    return monthNames[since.getMonth()] + ' ' + since.getFullYear();
  }
  
export default (state = defaultState, action) => {
    //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>MY_STUFF_REDUCER:state: " + state);
    //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>MY_STUFF_REDUCER:action: " + JSON.stringify(action));
    // const knowledgeData = action.knowledge;

    const {myStuff, userId, error, type, isFinished, isSelected} =  action;
    const data = myStuff ? myStuff.hasOwnProperty('data') ?  myStuff.data : myStuff : [];

    switch (type) {
        case MY_STUFF.LIST_MY_STUFF_START:
          return {
            ...state,
            isLoading: true,
            error: null,
            data: [],
            userId: userId,
            deviceIsRefreshed: []
          }
        case MY_STUFF.LIST_MY_STUFF_SUCCEEDED:
          return {
            ...state,
            isLoading: false,
            // data: myStuff.hasOwnProperty('data') ?  myStuff.data : myStuff
            data: data.map((item) => {

                const {pc_state, image, configuration} = item;
                if(pc_state === PC_REF_STATUS.REFRESH) {
                  item.isRefresh = true;
                  item.processing = 100;
                } else {
                  item.isRefresh = false;
                  item.processing = 0;
                }
              

              // set default value when device_profile is not define
              if(!item.device_profile) {
                item.device_profile = '';
              }
              
              item.device_type = (item.device_profile.toLowerCase()).indexOf('desktop') === -1 ? 'laptop' : 'desktop';

              if (!image) {
                item.image = noImageLaptop ;

                if (item.device_type === 'desktop') {
                  item.image = noImageDesktop;
                }
              }

              if(configuration && configuration.since){
                item.configuration.sinceStr = convertDateToStringDateMonthAndYear(configuration.since);
              }

              item.model = truncateString(item.model, 22);
              
              return {...item};
              }).sort((a,b) => sortByFieldNameDesc(a,b,'processing')),

              deviceIsRefreshed: data.filter((item) => {
                const {pc_state} = item;
                if(pc_state === PC_REF_STATUS.REFRESH) {
                  return {...item};
                }
              })
        }
        case MY_STUFF.SET_MY_STUFF_FINISHED_SUCCEEDED:
          return {
            ...state,
            isFinished: isFinished,
            isSelected: isSelected
          }

        case MY_STUFF.LIST_MY_STUFF_FAILED:
          return {
            ...state,
            isLoading: false,
            error: error,
          }
      }
    return state;
}
