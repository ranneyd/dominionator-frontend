import React, { Component } from 'react';

import Navigation from '@atlaskit/navigation';
import Banner from '@atlaskit/banner';
import AkToggle from '@atlaskit/toggle';
import Page, { Grid, GridColumn } from "@atlaskit/page";
import { AtlaskitThemeProvider } from "@atlaskit/theme";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isBannerOpen: false,
      navigationWidth: 0,
      isNavigationOpen: false,
    };
  }
  render() {
    return (
      <AtlaskitThemeProvider mode="light">
        <Page
          isBannerOpen={this.state.isBannerOpen}
          banner={
            <Banner appearance="error" isOpen={this.state.isBannerOpen}>
              Example Banner
            </Banner>
          }
          navigation={
            <Navigation
              width={this.state.navigationWidth}
              isOpen={this.state.isNavigationOpen}
              onResize={({ width, isOpen }) => {
                this.setState({
                  navigationWidth: width,
                  isNavigationOpen: isOpen,
                });
              }}
            >
              Example Navigation
            </Navigation>
          }
        >
          <Grid>
            <GridColumn>
              <h2>Use fullscreen display to view this example</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Blanditiis voluptatum perspiciatis doloribus dignissimos accusamus
                commodi, nobis ut, error iusto, quas vitae nesciunt consequatur
                possimus labore! Mollitia est quis minima asperiores.
              </p>
            </GridColumn>
            <GridColumn>
              <p>Toggle banner</p>
              <AkToggle
                label="toggle"
                size="large"
                onChange={() => {
                  this.setState({
                    isBannerOpen: !this.state.isBannerOpen,
                  });
                }}
              >
                Toggle banner
              </AkToggle>
            </GridColumn>
          </Grid>
        </Page>
      </AtlaskitThemeProvider>
    );
  }
}

export default App;