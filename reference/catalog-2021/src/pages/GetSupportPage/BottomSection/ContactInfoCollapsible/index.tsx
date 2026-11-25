import React, { useState } from 'react';
import { Box, Card, Collapsible, Grid, Typography } from '@lumos/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

interface ContactInfoCollapsibleProps {
  title: string;
}
/** Collapsible Container to keep MDP and Service Desk contact information consistent */
const ContactInfoCollapsible: React.FC<ContactInfoCollapsibleProps> = ({
  title,
  children,
}) => {
  const [isViewNumberExpanded, setIsViewNumberExpanded] = useState(false);

  return (
    <Card padding="8px" margin="10px" width="auto">
      <Collapsible
        expand={isViewNumberExpanded}
        trigger={
          <Grid
            tabIndex={0}
            alignItems="center"
            onClick={() => {
              setIsViewNumberExpanded(!isViewNumberExpanded);
            }}
            onKeyPress={e => {
              if (e.key === 'Enter')
                setIsViewNumberExpanded(!isViewNumberExpanded);
            }}
          >
            {isViewNumberExpanded ? <ExpandLess /> : <ExpandMore />}
            <Typography kind="subtitle2">{title}</Typography>
          </Grid>
        }
      >
        <Box paddingX="24px">{children}</Box>
      </Collapsible>
    </Card>
  );
};
export default ContactInfoCollapsible;
