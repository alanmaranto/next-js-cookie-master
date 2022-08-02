import React, { ChangeEvent, FC, useState } from "react";
import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { Layout } from "../components/layouts";
import Cookies from "js-cookie";
import { GetServerSideProps } from "next";

interface Props {
  theme: string;
}

const ThemeChangerPage: FC<Props> = ({ theme }) => {
  const [currentTheme, setCurrentTheme] = useState("light");

  const onThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentTheme(event.target.value);

    Cookies.set("theme", event.target.value);
  };

  return (
    <Layout>
      <Card>
        <CardContent>
          <FormControl>
            <FormLabel>Theme</FormLabel>
            <RadioGroup value={currentTheme} onChange={onThemeChange}>
              <FormControlLabel
                value="light"
                control={<Radio />}
                label="Light"
              />
              <FormControlLabel value="dark" control={<Radio />} label="Dark" />
              <FormControlLabel
                value="custom"
                control={<Radio />}
                label="Custom"
              />
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>
      <h1>theme-changer</h1>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx;
  const { theme = "light" } = req.cookies;

  return {
    props: {
      theme,
    },
  };
};

export default ThemeChangerPage;
