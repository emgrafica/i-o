import { Checkbox, FormControlLabel } from '@material-ui/core';
import SvgIcon from '@material-ui/core/SvgIcon';
import TreeItem from "@material-ui/lab/TreeItem";
import TreeView from "@material-ui/lab/TreeView";
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import './multipleSelect.scss';
import Radio from '@material-ui/core/Radio';

const MinusSquare = (props) => {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 18, height: 18 }} {...props}>
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

const PlusSquare = (props) => {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 18, height: 18 }} {...props}>
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

const IoMultipleSelect = (props) => {

  const {label, data, selectedItems, onChange, multiple} = props;

  let count = 1;
  const [expanded, setExpanded] = useState([]);
  const [checkedItems, setCheckedItems] = useState(selectedItems || []);

  useEffect(() => {
    setCheckedItems(selectedItems);
  }, [selectedItems]);

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const isChecked = (item) => {
    if(checkedItems.length > 0) {
      const listSelectedID = checkedItems.map(e=> e.id);
      return listSelectedID.includes(item.id);
    }
    return false;
  };

  const handleCheckboxChange = (item) => {
    let selectedList = [];
    selectedList = multiple ? checkedItems.concat([item]) : [item];
    
    const indexSelected = checkedItems.findIndex(e => e.id === item.id);
    
    if(indexSelected !== -1){
      selectedList = [...checkedItems];
      selectedList.splice(indexSelected, 1);
    }

    setCheckedItems(selectedList);
    onChange(selectedList);

  };

  const createListTreeItem = (items)=>{
    return items.map((item, index) => {
      return (
        <TreeItem 
          nodeId={`"${++count}"`}
          key={index}
          label={
            multiple ? 
              <FormControlLabel 
                className="tree-item-form-checkbox"
                control={
                  <Checkbox 
                    checked={isChecked(item)} 
                    color="primary" 
                    onChange={()=>handleCheckboxChange(item)}
                  />
                }
                label={item.label}
              />
              :
              <FormControlLabel 
                className="tree-item-form-checkbox"
                control={
                  <Radio 
                    checked={isChecked(item)} 
                    color="primary" 
                    onChange={()=>handleCheckboxChange(item)}
                  />
                }
                label={item.label}
              />
          }
        />
      );
    });
  };


  return (
    <TreeView
      className="multiple-select"
      defaultCollapseIcon={<MinusSquare />}
      defaultExpandIcon={<PlusSquare />}
      expanded={expanded}
      selected={selectedItems}
      defaultExpanded={['1']}
      onNodeToggle={handleToggle}
      multiSelect
    >
      <TreeItem nodeId={`"${++count}"`} label={label}>
        {createListTreeItem(data)}
      </TreeItem>
    </TreeView>
  );
};

IoMultipleSelect.propTypes = {
  multiple: PropTypes.bool,
  label: PropTypes.string,
  data: PropTypes.array,
  selectedItems:PropTypes.array
};

IoMultipleSelect.defaultProps = {
  multiple: false,
  label: 'Ticket status',
  data: [],
  selectedItems: [],
  onChange: (item) => {}
};

export default IoMultipleSelect;
