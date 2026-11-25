import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
// Import css files
import "slick-carousel/slick/slick.css";
import { AUTH } from "constants/authConstants";
import { ROUTER } from "constants/routerConstants";
import { loadMyStuffAction } from "redux/actions/myStuffAction";
import "./MyDevicesComponent.scss";
import MyDeviceDetailComponent from "components/MyDeviceDetail/MyDeviceDetailComponent";

const MyDevicesComponent = (props) => {
  var settings = {
    dots: true,
    infinite: false
  };

  const { data: myDevices, isLoading } = props.myStuff;

  const history = useHistory();
  const query = useQuery();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!myDevices || myDevices.length === 0) {
      let userInfo = JSON.parse(localStorage.getItem(AUTH.CURRENT_USER));
      props.loadMyStuffAction(userInfo.user_name);
    }
  }, []);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const handleOnclickHelpLink = (param) => {
    if (param) {
      history.push({
        pathname: ROUTER.SEARCH,
        search: `?param=${param}&paging=${1}`, // query string
        state: {
          path: `${history.location.pathname}${history.location.search}`
        }
      });
    }
  };

  const onRefreshHandleClick = (props) => {
    history.push(ROUTER.MARKETPLACE, props);
  };

  const handleViewDetailClick = (kbNumber, uid) => {
    history.push({
      pathname: `/knowledges/detail/${kbNumber}`,
      state: {
        uid: uid
      }
    });
  };

  const generateMyDeviceDetailComponent = () => {
    const UidSelected = query.get("uid");

    const result = myDevices.sort((a, b) =>
      a.uid === UidSelected ? -1 : b.uid === UidSelected ? 1 : 0
    );
    return result.map((item, index) => (
      <div key={index}>
        <MyDeviceDetailComponent
          device={item}
          isItemFinished={item.isRefresh}
          getHelpUrl={handleOnclickHelpLink}
          onRefreshHandleClick={onRefreshHandleClick}
          handleViewDetailClick={handleViewDetailClick}
        />{" "}
      </div>
    ));
  };

  return (
    <div className="my-devices-block custom_container">
      <Link className="icon-back" to="/">
        Go Back
      </Link>
      
      <div className="inner">
        {!isLoading && (
          <Slider {...settings} className="my-devices-slider">
            {generateMyDeviceDetailComponent()}
          </Slider>
        )}
      </div>

    </div>
  );
};

//connect into Redux saga
const mapStateToProps = ({ myStuff, router }) => ({
  myStuff,
  router,
});

const mapDispatchToProps = (dispatch) => ({
  loadMyStuffAction: (userId) => dispatch(loadMyStuffAction(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyDevicesComponent);
