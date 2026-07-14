'use client'
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from '@mui/material/Paper'
import { theme } from "@/utils/themeSettings";
import { ThemeProvider } from '@mui/material/styles';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
       
          <div
         className="body1 dark-body1 description "
            dangerouslySetInnerHTML={{ __html: children }}
            style={{padding: "8px 16px"}}
          />
      
      )}
    </div>
  );
}
export default function ScrollableTabs({ tabsData }) {
  if(!tabsData) return null;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = tabsData.map((item, index) => {
    return <Tab key={index} label={item.title} />;
  });
  return (
    <ThemeProvider theme={theme}>
    <Paper
    className="mt-24"
      variant="outlined"
      sx={{
        background: "var(--dark-surface-container-low);",

      }}
    >
      <Tabs
       value={value}
       onChange={handleChange}
       variant="scrollable"
       scrollButtons="auto"
       aria-label="scrollable auto tabs"
          textColor="secondary"
  indicatorColor="secondary"
       className="tabs-wrapper"
      
      >
        {tabs}
      </Tabs>
      {/* content panels  */}
      {tabsData.map((item, index) => {
        return (
          <CustomTabPanel
            key={100 + index}
            value={value}
            index={index}
            className="description-wrapper"

          >
            {item.description}
          </CustomTabPanel>
        );
      })}
    </Paper>
        </ThemeProvider>
    
  );
}


