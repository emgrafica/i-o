import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SvgIcon from "@material-ui/core/SvgIcon";
import { alpha, withStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import Collapse from "@material-ui/core/Collapse";
import { FormControlLabel, Button, Radio } from "@material-ui/core";
import { useSpring, animated } from "react-spring";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import "./selectTreeComponent.scss";

const generateClassName = createGenerateClassName({
  productionPrefix: "io-select-tree"
});

function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 18, height: 18 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 18, height: 18 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function TransitionComponent(props) {
  const style = useSpring({
    from: { opacity: 0, transform: "translate3d(20px,0,0)" },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,
};

const StyledTreeItem = withStyles(
  (theme) => (
    {
      iconContainer: {
        "& .close": {
          opacity: 0.3,
        },
      },
      group: {
        marginLeft: 7,
        paddingLeft: 9,
        borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
      },
    }
  )
)((props) => <TreeItem {...props} TransitionComponent={TransitionComponent} />);

export function SelectTreeComponent(props) {
  let count = 1;

  const {
    data,
    selectedItems,
    onChange,
    multiple,
    label,
    onApplyButtonClick,
    isShowApply,
  } = props;
  const [checkedItems, setCheckedItems] = useState(selectedItems || []);

  useEffect(() => {
    //Remove select option when list data empty
    if(!data.length){
      setCheckedItems([]);
    }else{
      setCheckedItems(selectedItems);
    }
  }, [data]);

  const handleCheckboxChange = (item) => {
    let selectedList = [];
    const listSelectedID = checkedItems.map((e) => e);
    const indexSelected = listSelectedID.indexOf(item.id);
    if (indexSelected !== -1) {
      selectedList = [...checkedItems];
      selectedList.splice(indexSelected, 1);
    } else if (indexSelected !== 0) {
      selectedList = [item.id];
    }
    setCheckedItems(selectedList);
    onChange(selectedList);
  };

  const isChecked = (item) => {
    const listSelectedID = checkedItems.map((e) => e);
    return listSelectedID.indexOf(item.id) !== -1;
  };

  const createListTreeItem = (items) => {
    return items.map((e) => {
      if (e.childs && e.childs.length > 0) {
        return (
          <StyledTreeItem
            key={++count}
            nodeId={++count+""}
            className="parent-treee-item"
            label={e.label}
          >
            {createListTreeItem(e.childs)}
          </StyledTreeItem>
        );
      } else {
        return (
          <StyledTreeItem
            key={++count}
            nodeId={++count+""}
            label={
              <FormControlLabel
                className="tree-item-form-checkbox"
                control={
                  <Radio
                    className="tree-node"
                    checked={isChecked(e)}
                    onClick={() => handleCheckboxChange(e)}
                  />
                }
                label={e.label}
              />
            }
          />
        );
      }
    });
  };

  return (
    <StylesProvider generateClassName={generateClassName}>
      <TreeView
        className={"select-tree-component"}
        defaultExpanded={["1"]}
        defaultCollapseIcon={<MinusSquare />}
        defaultExpandIcon={<PlusSquare />}
        defaultEndIcon={<span />}
      >
        <StyledTreeItem
          nodeId={++count+""}
          className="parent-treee-item"
          label={
            <div>
              <span className="parent-treee-item-label">{label}</span>
              {isShowApply && (
                <Button
                  className="parent-treee-item-button"
                  onClick={onApplyButtonClick}
                  size="small"
                  variant="outlined"
                  color="primary"
                >
                  Apply
                </Button>
              )}
            </div>
          }
        >
          {createListTreeItem(data)}
        </StyledTreeItem>
      </TreeView>
    </StylesProvider>
  );
}

SelectTreeComponent.propTypes = {
  data: PropTypes.array,
  selectedItems: PropTypes.array,
  multiple: PropTypes.bool,
  isShowApply: PropTypes.bool,
};

SelectTreeComponent.defaultProps = {
  selectedItems: ["7905665f877e2010c541ff7acebb3574"],
  label: "Categories",
  isShowApply: false,
  data: [
    {
      label: "(empty)",
      id: "NULL_VALUE",
      selected: false,
    },
    {
      sys_id: "36bf6c6cdb9a92006cd53c8caf961934",
      show_children: false,
      level: 1,
      parent_id: "796775afdb8252006cd53c8caf961929",
      id: "36bf6c6cdb9a92006cd53c8caf961934",
      label: "Service Desk",
      parent_table: "kb_knowledge_base",
      childs: [
        {
          sys_id: "8fd78eb6dbf79a406052bd9eaf961975",
          show_children: false,
          level: 1,
          parent_id: "2dd6b56fdb8252006cd53c8caf9619e3",
          id: "8fd78eb6dbf79a406052bd9eaf961975",
          label: "Hardware",
          parent_table: "kb_knowledge_base",
          childs: [
            {
              sys_id: "0f6bfbffdb0e52006cd53c8caf9619a5",
              show_children: false,
              level: 1,
              parent_id: "2dd6b56fdb8252006cd53c8caf9619e3",
              id: "0f6bfbffdb0e52006cd53c8caf9619a5",
              label: "About Us",
              parent_table: "kb_knowledge_base",
              childs: [],
              selected: false,
            },
          ],
          selected: false,
        },
        {
          sys_id: "0f6bfbffdb0e52006cd53c8caf9619a5",
          show_children: false,
          level: 1,
          parent_id: "2dd6b56fdb8252006cd53c8caf9619e3",
          id: "0f6bfbffdb0e52006cd53c8caf9619a5",
          label: "About Us",
          parent_table: "kb_knowledge_base",
          childs: [],
          selected: false,
        },
      ],
      selected: false,
    },
    {
      sys_id: "8fd78eb6dbf79a406052bd9eaf961975",
      show_children: false,
      level: 1,
      parent_id: "2dd6b56fdb8252006cd53c8caf9619e3",
      id: "8fd78eb6dbf79a406052bd9eaf961975",
      label: "Hardware",
      parent_table: "kb_knowledge_base",
      childs: [],
      selected: false,
    },
    {
      sys_id: "0f6bfbffdb0e52006cd53c8caf9619a5",
      show_children: false,
      level: 1,
      parent_id: "2dd6b56fdb8252006cd53c8caf9619e3",
      id: "0f6bfbffdb0e52006cd53c8caf9619a5",
      label: "About Us",
      parent_table: "kb_knowledge_base",
      childs: [],
      selected: false,
    },
    {
      sys_id: "1ee40ee3dbc252006cd53c8caf96196d",
      show_children: false,
      level: 1,
      parent_id: "3b16b56fdb8252006cd53c8caf9619a9",
      id: "1ee40ee3dbc252006cd53c8caf96196d",
      label: "Applications",
      parent_table: "kb_knowledge_base",
      childs: [],
      selected: false,
    },
    {
      sys_id: "03d78eb6dbf79a406052bd9eaf961976",
      show_children: false,
      level: 1,
      parent_id: "2dd6b56fdb8252006cd53c8caf9619e3",
      id: "03d78eb6dbf79a406052bd9eaf961976",
      label: "Lotus Notes",
      parent_table: "kb_knowledge_base",
      childs: [],
      selected: false,
    },
    {
      sys_id: "8127e6349f30020034c6b6a0942e70cb",
      show_children: false,
      level: 1,
      parent_id: "e15c06f09f30020034c6b6a0942e7076",
      id: "8127e6349f30020034c6b6a0942e70cb",
      label: "Common Weaknesses",
      parent_table: "kb_knowledge_base",
      childs: [],
      selected: false,
    },
    {
      sys_id: "041b77ffdb0e52006cd53c8caf96195f",
      show_children: false,
      level: 1,
      parent_id: "2dd6b56fdb8252006cd53c8caf9619e3",
      id: "041b77ffdb0e52006cd53c8caf96195f",
      label: "Applications",
      parent_table: "kb_knowledge_base",
      childs: [],
      selected: false,
    },
    {
      sys_id: "47d78eb6dbf79a406052bd9eaf961976",
      show_children: false,
      level: 1,
      parent_id: "2dd6b56fdb8252006cd53c8caf9619e3",
      id: "47d78eb6dbf79a406052bd9eaf961976",
      label: "Security",
      parent_table: "kb_knowledge_base",
      childs: [],
      selected: false,
    },
    {
      sys_id: "7905665f877e2010c541ff7acebb3574",
      show_children: false,
      level: 1,
      parent_id: "429b07aa0b231200263a089b37673a97",
      id: "7905665f877e2010c541ff7acebb3574",
      label: "OT Security Monitoring",
      parent_table: "kb_knowledge_base",
      childs: [],
      selected: false,
    },
    {
      sys_id: "cfd78eb6dbf79a406052bd9eaf961975",
      show_children: false,
      level: 1,
      parent_id: "2dd6b56fdb8252006cd53c8caf9619e3",
      id: "cfd78eb6dbf79a406052bd9eaf961975",
      label: "Internet Explorer",
      parent_table: "kb_knowledge_base",
      childs: [],
      selected: false,
    },
  ],
  multiple: false,
  onChange: (item) => {
    console.log("selected item", item);
  },
  onApplyButtonClick: (e) => {
    console.log("onApplyButtonClick", e);
  },
};
export default SelectTreeComponent;
