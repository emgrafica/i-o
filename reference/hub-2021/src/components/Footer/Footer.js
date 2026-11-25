import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'

import 'bootstrap/dist/css/bootstrap.min.css';
import "./Footer.scss";

// Link Library for App
import { getLinkLibrary } from "../../services/linkLibraryService";
import {SESSIONSTORAGEKEYS} from "../../constants/storageConstants";
import {LINKLIRARYCONSTANTS} from "../../constants/linkLibraryConstants";
import { AUTH } from '../../constants';

const propTypes = {
    links: PropTypes.array
}

const Footer = props => {
    const [links, setLinks] = useState([]);
    const currentUser = localStorage.getItem(AUTH.CURRENT_USER);
    if(!currentUser) return (null);

    useEffect(() => {
        if (sessionStorage.getItem(SESSIONSTORAGEKEYS.LINK_LIBRARY_FOOTER) == undefined) {
            //Fetch Link Library data and store to localStorage which can be shared across components
            //console.log("Fetching Link Library data for App...");
            
            (async () => {
                const respone = await getLinkLibrary(LINKLIRARYCONSTANTS.FOOTER);
                if (respone) {
                    const data = respone.data || null;
                    sessionStorage.setItem(SESSIONSTORAGEKEYS.LINK_LIBRARY_FOOTER, JSON.stringify(data));
                    //console.log(data);
                    setLinks(data);
                }
            })();
        }
        else {
            const lsLinks = JSON.parse(sessionStorage.getItem(SESSIONSTORAGEKEYS.LINK_LIBRARY_FOOTER));
            setLinks(lsLinks);
        }
    }, []);

    return (
        <div className="footer">
            <div className="float-right">
                <div className="quick-link-header">QUICK LINKS</div>
                <div>
                    {
                        links && links.map((item, index) => { 
                            return (
                                //<Row> <a href={item.url} title={item.title}>{item.title}</a> </Row>
                                <div className="row" key = {index}>
                                    <a href={item.url} className="footer-link">{item.heading}</a>
                                </div>

                            ); 
                        })
                        }
                </div>
            </div>
        </div>
    );
}   

Footer.propTypes = propTypes;

export default Footer;