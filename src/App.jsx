import React, { Component } from 'react';

// import Navigation from '@atlaskit/navigation';
// import Banner from '@atlaskit/banner';
// import AkToggle from '@atlaskit/toggle';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import FieldText from '@atlaskit/field-text';
import PageHeader from '@atlaskit/page-header';
import MultiSelect from '@atlaskit/multi-select';
import FieldRange from '@atlaskit/field-range';
import Checkbox, { CheckboxGroup } from '@atlaskit/checkbox';
import { AtlaskitThemeProvider } from '@atlaskit/theme';
import './App.scss';

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
          // isBannerOpen={this.state.isBannerOpen}
          // banner={
          //   <Banner appearance="error" isOpen={this.state.isBannerOpen}>
          //     Example Banner
          //   </Banner>
          // }
          // navigation={
          //   <Navigation
          //     width={this.state.navigationWidth}
          //     isOpen={this.state.isNavigationOpen}
          //     onResize={({ width, isOpen }) => {
          //       this.setState({
          //         navigationWidth: width,
          //         isNavigationOpen: isOpen,
          //       });
          //     }}
          //   >
          //     Example Navigation
          //   </Navigation>
          // }
        >
          <Grid>
            <GridColumn small={12}>
              <PageHeader
                bottomBar={(
                  <Grid>
                    <GridColumn small={12} medium={6}>
                      <div className="fullWidthSelect">
                        <MultiSelect
                          label="Expansion"
                          placeholder="All Expansions"
                          items={[
                            { content: "Dominion (1st Edition)", value: "dominion1"},
                            { content: "Dominion (2nd Edition)", value: "dominion2"},
                            { content: "Intrigue (1st Edition)", value: "intrigue1"},
                            { content: "Intrigue (2nd Edition)", value: "intrigue2"},
                          ]}
                        />
                      </div>
                    </GridColumn>
                    <GridColumn small={6} medium={3}>
                      <div className="fullWidthSelect">
                        <MultiSelect
                          label="Type"
                          placeholder="All types"
                          items={[
                            { content: "Action", value: "action"},
                            { content: "Attack", value: "attack"},
                            { content: "Treasure", value: "treasure"},
                            { content: "Victory", value: "victory"},
                          ]}
                        />
                      </div>
                    </GridColumn>
                    <GridColumn small={6} medium={3}>
                      <div className="fullWidthSelect">
                        <MultiSelect
                          label="Tags"
                          placeholder="All tags"
                          items={[
                            { content: "+ Cards", value: "plus_cards"},
                            { content: "+ Action", value: "plus_action"},
                            { content: "+ Actions", value: "plus_actions"},
                            { content: "Trash", value: "trash"},
                          ]}
                        />
                      </div>
                    </GridColumn>
                    <GridColumn small={12} medium={6}>
                      <CheckboxGroup>
                        <div className="checkboxRow">
                          <Checkbox label="Min Cost" />
                          <FieldRange step={1} min={0} max={8} />
                        </div>
                        <Checkbox label="Max Cost" />
                      </CheckboxGroup>
                    </GridColumn>
                  </Grid>
                )}
              >
                Dominionator
              </PageHeader>
            </GridColumn>
          </Grid>
        </Page>
      </AtlaskitThemeProvider>
    );
  }
}

export default App;
