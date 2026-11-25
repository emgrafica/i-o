import { Row } from "antd";
import React from 'react';

const propTypes = {
    
}

function PolicyComponent(props) {
    var d = new Date(); 
    const fullYear = d.getFullYear();
    return (
        <div id="legal-statement"> 
            <Row id="accordion" > 
                <Row id="collapseElectronic" className="panel-collapse collapse show in"> 
                    By accessing this system, you acknowledge the monitoring and inspection of all your activities on this system in accordance with DXC's electronic communications use policies, security standards and guidelines. DXC may use the data held by this system to process requests made by users, further DXC's business interests, protect its rights and property, and otherwise ensure compliance with applicable law, corporate policy, and guidelines. All such actions will follow the terms of local laws and regulations and DXC policies and guidelines. 
                    <a className="more" href="https://www.dxc.technology/privacy" target="_blank"><b>DXC Enterprise Online Privacy Statement</b></a> | <a className="more" href="https://dxcportal.sharepoint.com/:w:/r/sites/policy/Shared%20Documents/Risk/Acceptable%20Use%20Policy.docx?d=wc22309412a184f38a953b7d3f365bd5f&amp;csf=1&amp;web=1&amp;e=9Kq0yi" target="_blank"><b>DXC Acceptable Use Policy</b></a> 
                    <br/>  
                </Row>  
            </Row>
            <Row id="copyright"><br/>© Copyright {fullYear} DXC Technology Company. All rights reserved.
            </Row>
        </div>
    )
}

PolicyComponent.propTypes = propTypes

export default PolicyComponent
