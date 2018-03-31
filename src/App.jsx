import React, { Component } from 'react';

// import Navigation from '@atlaskit/navigation';
// import Banner from '@atlaskit/banner';
// import AkToggle from '@atlaskit/toggle';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import PageHeader from '@atlaskit/page-header';
import MultiSelect from '@atlaskit/multi-select';
import FieldRange from '@atlaskit/field-range';
import FieldBase, { Label } from '@atlaskit/field-base';
import Checkbox from '@atlaskit/checkbox';
import DynamicTable from '@atlaskit/dynamic-table';
import { AtlaskitThemeProvider } from '@atlaskit/theme';
import './App.scss';


const SET = "Set";
const NAME = "Card Name";
const COST = "Cost";
const TYPE = "Type";
const TAGS = "Tags";
const IMG = "Image Address";

const COL_ORDER = [NAME, COST, TYPE];


class App extends Component {
  constructor(props) {
    super(props);

    const baseData = this.processData();
    this.state = {
      // isBannerOpen: false,
      // navigationWidth: 0,
      // isNavigationOpen: false,
      baseData,
      ...baseData,
      min: null,
      max: null,
    };
  }
  processData = () => {
    const {
      data
    } = this.props;

    const setSet = new Set();
    const typeSet = new Set();
    const tagSet = new Set();

    const cards = data.map((card) => {
      setSet.add(card[SET]);
      typeSet.add(card[TYPE]);
      console.log(card);
      let tags = card[TAGS].split(",");
      tags.forEach(tag => tagSet.add(tag));
      return {
        ...card,
        [TAGS]: tags,
      };
    });
    return {
      sets: Array.from(setSet),
      types: Array.from(typeSet),
      tags: Array.from(tagSet),
      cards,
    };
  }
  renderCostRow = (key, value) => (
    <div className="costRow">
      <div className="checkboxRow">
        <Checkbox
          label={`${key.charAt(0).toUpperCase()}${key.substr(1)} Cost`}
          onChange={(e, val) => {
            const { isChecked } = e;
            if (isChecked) {
              this.setState({ [key]: 0 });
            } else {
              this.setState({ [key]: null });
            }
          }}
        />
        {value != null &&  <span className="number">:&nbsp;{value}</span>}
      </div>
      {value != null && (
        <FieldRange
          step={1}
          min={0}
          max={8}
          value={value}
          onChange={value => this.setState({ [key]: value })}
        />
      )}
    </div>
  )
  render() {
    const {
      min,
      max,
      cards,
    } = this.state;

    const head = {
      cells: COL_ORDER.map(col => ({
        key: col,
        content: col,
        isSortable: true,
      }))
    };
    console.log(head);
    const rows = cards.map(card => ({
      cells: COL_ORDER.map(key => ({
        key,
        content: card[key]
      })),
      key: card[NAME]
    }));
    console.log(rows);
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
                    <GridColumn small={12} medium={6}>
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
                    <GridColumn small={12} medium={6}>
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
                      <Label label="Cost" />
                      <div className="costField">
                        <FieldBase>
                          <div className="costGroup">
                            {this.renderCostRow("min", min)}
                            {this.renderCostRow("max", max)}
                          </div>
                        </FieldBase>
                      </div>
                    </GridColumn>
                  </Grid>
                )}
              >
                Dominionator
              </PageHeader>
              <DynamicTable
                head={head}
                rows={rows}
                rowsPerPage={10}
                defaultPage={1}
                loadingSpinnerSize="large"
                isLoading={false}
                isFixedSize
                defaultSortKey="term"
                defaultSortOrder="ASC"
                onSort={() => console.log('onSort')}
                onSetPage={() => console.log('onSetPage')}
              />
            </GridColumn>
          </Grid>
        </Page>
      </AtlaskitThemeProvider>
    );
  }
}

export default App;
