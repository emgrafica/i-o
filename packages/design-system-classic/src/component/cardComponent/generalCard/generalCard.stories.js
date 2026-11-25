import { Col } from 'antd';
import React from 'react';
import GeneralCard from './generalCard';

export default {
  title: 'i-o/Card/General Card',
  component: GeneralCard,
  decorators: [
    (Story) => (
        <Col span={8}>
            <Story/>
        </Col>
    )
  ]
};

const Template = (args) => <GeneralCard {...args} />;



// ***********************************
// *   a) Device small card
// ***********************************
export const GeneralCardTemplate = Template.bind({});
GeneralCardTemplate.storyName = 'Device Small Card';
GeneralCardTemplate.args = {
  displayLinkIcon: false,
  uid: "84b81272878fa41020ae0e1acebb35e2",
  name: "ThinkPad 1410",
  srcIcon: "https://cdn.i-o.systems/images/devices_lenovo_thinkcentre_m92p.jpg",
  link: "Prepare for return",
  onMyDevicesHandleClick:()=>{},
};

GeneralCardTemplate.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/GuxGvKlR4K4h2e1jbzj0r0?node-id=1924%3A446'
  }
};


// ***********************************
// *   b) Manage your software
// ***********************************
export const manageYourSoftwareCard = Template.bind({});
manageYourSoftwareCard.storyName = 'Manage Your Software';
manageYourSoftwareCard.args = {
  displayLinkIcon: true,
  name: "Manage your software",
  srcIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAwCAYAAACBpyPiAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAASdEVYdFNvZnR3YXJlAEdyZWVuc2hvdF5VCAUAAAHJSURBVGhD7Zm9T8MwFMT5xxkZGYGpTIgBJCQW2DohFiQGBmBqp8JSqRILbCYXbMtx77m2k1Kleifd1OfrL3bqrx6YEWu/4BdzY6Y3ZX64M+ZrZQM2CPmoZzmSpfwOPArPDuv9/myDBD1Nebtco30oD9832FkaATwYqy/1YmYDG3n4i2NeXGoMMdPthNeXGjlOLTx6ixXW+P6yzV3TUJ2DHKfB4cOeCaXwjRVessInrPCSFT5hhZf87/A/37ywxtveHlyf2sBGLTyEHmPFpZa2xdiwsfpSY9vu5OGXH8acH/EGub46sWFEGN2+vY/2eMWdPDyED2pGAA+N8wAAU0J+7YEHXCE41IF3AgQKc12q0nypUyj8WKTwu9J+wePH8fL4N3vkevZmG2eoJh9rB364sTrwKGTTVI4xB2OtSAnQtWvJpGkXL4Aefoh7FXyBNK3hpoy1KfVW720wekxDbT/CvVMLj95ihTXWe5uEFV6ywies8JIVPmGFl6zwCa/Bj2l7sJN7m75/kzrTextsNVlxicMhjYVXs++9EPKR4+Thoflr/fBi5MJgJhxW+uTHh50OvBMODiXeBB2LZaS8/LQNI1H4sWjE8Mb8AgykTiDM40BhAAAAAElFTkSuQmCC",
  link: "Company Portal",
  url: "companyportal://",
  onMyDevicesHandleClick:()=>{},
};

manageYourSoftwareCard.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/GuxGvKlR4K4h2e1jbzj0r0?node-id=529%3A1791'
  }
};

// ***********************************
// *   c) Find accessories
// ***********************************
export const findAccessoriesCard = Template.bind({});
findAccessoriesCard.storyName = 'Find Accessories';
findAccessoriesCard.args = {
  displayLinkIcon: true,
  name: "Manage your software",
  srcIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAyCAYAAADMb4LpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAM1SURBVHgB7ZpPbhoxFMY/e0BNFpU4wvQEoScIOUGTEwSWpIrU7KoqbUgbVV02qtIo3WRygnKDkBOU3mB6A6Quoqhk3O8NTAiDgYEAA9L8JP7ZHvub5/dsj43CDPh2aEqOQlEDGzAoGoUCk90o3wAtbeBDwQ+Am3uD5v6JauCJKEyJCM4rvKKYMispYHJ8vhrBPU5ff1ZNTMHE4kV0TuGIX0uYHY22wfGkvZFY/Plb4yKPS8xWdBwP/3Bc/aL8JIV1kkIXH8yuyeMX5itcKNNA1+fvTTlJ4bGWvzg0R4FCbVy5MCjZ/cbgTxCgqTRarLwlefzt0kyuA2yyrmKiGGGb1Y/qeHSREdAC4iblkRUY1Cn8tDqBv54zbowEusLumKJe9ZOqDMscKj6BcA8O/bOWzD+tbdSMa9qojbmJoTdgFT/GVXz6SKU6g3E6QnqCSsRYrrXAEBcaEH/GYKHvXlrr4OTyLIetSk21MGOkF1SAn4yZoi2f6Tt7J6rep6evgs5weA2LBXjx1XoOb+Yh/DHfD403xI1aa3/xovK1136uLzsfTj5u/CqxON2kjAVwRwOtB9iw9EDh7nnoETtRwsM4H1rdHqC+yfUumDcH7NlbjS10lg99cITalhk++v0gXuXsfh4G5xNGlGmQG5B2bXndpUlIKF6szpVgyVLWm+WoMgnSrsSZJasUWb9j+XzvbvrgOI4UoTfUbOkM1G35jNymZCnjLdpd4kj7HCwaAxnd0Uj/eGckqt14ftveZQuHQWrr/cIZdeu2Y7V6az8lX48T+n53gfcYzgUlTb/ZtFxzgyVCVqvxNK5aNzT7ZWB5GnBSwhLBZ97f8TSZxDSHSDeewTXDUolHMDhh0W0KMtq48Yx7i4+lCX3btyS7iR4Dl5VMfFpk4tNipcUr7hIYTM/IrYlxjHjkS0TmNmmRiU+LTHxaZOLTIhOfFpn4tFh58T5WEK6Fm5pvS7XBlBQupZtayaneCiJ7qVr2AnkDdawWnuylhgF764SnED5WA3/NwYF8CcWHxygOtsySbGsPg8+rdQp/GZ1IPpwGdg8SyjzQ9eRoXf74w33MItLHV53/NFztxbbd/wOWYxRPo15v/wAAAABJRU5ErkJggg==",
  link: "Go to DXC Gear",
  uri: 'https://gear.dxc.com/login',
  onMyDevicesHandleClick:()=>{},
};

findAccessoriesCard.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/GuxGvKlR4K4h2e1jbzj0r0?node-id=529%3A1791'
  }
};
