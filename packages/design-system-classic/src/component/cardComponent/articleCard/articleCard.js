import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography } from "antd";
import articleImg from '../../../assets/icons/article.svg';
import "antd/dist/antd.css";
import './articleCard.scss';
const { Title, Paragraph } = Typography;
const ArticleCard = (props) => {

  return (
    <div className="io-article-ticket">
      <Card className={"io-article-item card-wrap" + (props.direction === 'vertical'? ' io-article-item-vertical': ' ')}
        onClick={(e) => props.onClick(e, {...props})}
        bodyStyle={{ padding: "0", display: "flex", width: "100%" }}
        hoverable>
        <div className='article-left'>
              <img src={props.articleImg}/>
        </div>
        <div className="article-right">
          {!!props.cardType &&<div className="article-type">{props.cardType}</div>}
          <h5 className={"article-title number-of-line-"+ props.cardTitleMaxRox}>{props.cardTitle}</h5>
          {/* <Title ellipsis={{ rows: props.cardTitleMaxRox }}>{props.cardTitle}</Title> */}
          {!!props.cardDesc && <Paragraph ellipsis={{ rows: 2 }} className='knowledge-card-desc'>
            {props.cardDesc}
          </Paragraph>}
        </div>
      </Card>
    </div>
  );
};

ArticleCard.propTypes = {
  /**
   * Type of card
   */
   cardType: PropTypes.string,

  /**
   * Title of card
   */
  cardTitle: PropTypes.string,
  
  /**
   * Max row of cardTitle
   */
   cardTitleMaxRox: PropTypes.number,
  /**
   * Description of card
   */
  cardDesc: PropTypes.string,
  /**
   * What image to use
   */
  articleImg: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  /**
   * Direction of the card. Just accept horizontal or  vertical
   */
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

ArticleCard.defaultProps = {
  direction: 'horizontal',
  cardType: '',
  cardTitleMaxRox: 2,
  cardTitle: 'Universal ID -- First time login and Portal overview',
  cardDesc:'Universal ID is replacing Global Pass as the new way you will log into DXC sites, applications and tools. Universal ID will be rolled out in phases. Access the Universal ID PortalOpen uid.dxc.com',
  articleImg: articleImg,
  onClick: ()=>{},
};


export default ArticleCard;



