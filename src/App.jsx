import React, { Component } from 'react';

import Page, { Grid, GridColumn } from '@atlaskit/page';
import PageHeader from '@atlaskit/page-header';
import MultiSelect from '@atlaskit/multi-select';
import FieldRange from '@atlaskit/field-range';
import { Label } from '@atlaskit/field-base';
import { AtlaskitThemeProvider } from '@atlaskit/theme';
import PotionIcon from '@atlaskit/icon/glyph/jira/labs';
import Lozenge from '@atlaskit/lozenge';
import { FieldTextStateless as FieldText } from "@atlaskit/field-text";

import DynamicTable from '@atlaskit/dynamic-table';

import './App.scss';


const SET = "Set";
const NAME = "Card Name";
const COST = "Cost";
const TYPE = "Type";
const TAGS = "Tags";
const IMG = "Image Address";

const HEAD = {
  cells: [
    {
      key: NAME,
      content: NAME,
      isSortable: true,
      width: "145px",
    },
    {
      key: COST,
      content: COST,
      isSortable: true,
      width: "70px",
    },
    {
      key: TYPE,
      content: TYPE,
      shouldTruncate: true,
    },
    // {
    //   key: TAGS,
    //   content: TAGS,
    //   shouldTruncate: true,
    // },
    {
      key: SET,
      content: SET,
      shouldTruncate: true,
    },
  ]
};

class App extends Component {
  constructor(props) {
    super(props);

    const baseData = this.processData();
    this.state = {
      baseData,
      ...baseData,
      sets: [],
      types: [],
      tags: [],
      name: '',
    };
  }
  processData = () => {
    const {
      data
    } = this.props;

    const setSet = new Set();
    const typeSet = new Set();
    const tagSet = new Set();

    let max = 0;

    const cards = data.map((card) => {
      card[SET].forEach(set => setSet.add(set));
      card[TYPE].forEach(type => typeSet.add(type));
      card[TAGS].forEach(tag => tag && tagSet.add(tag));
      if (card[COST][0] > max) {
        max = card[COST][0];
      }
      return {
        ...card,
      };
    });
    return {
      sets: Array.from(setSet).sort(),
      types: Array.from(typeSet).sort(),
      tags: Array.from(tagSet).sort(),
      cards,
      max,
      min: 0,
    };
  }
  componentDidUpdate(nextProps, nextState) {
    const {
      baseData,
      name,
      min,
      max,
      types,
      sets,
      tags,
    } = this.state;
    const watchedKeys = ["name", "min", "max", "types", "sets", "tags"];
    if (watchedKeys.reduce((changed, key) => changed || this.state[key] !== nextState[key], false)) {
      // TODO: we can probably memoize a lot of this
      let lcName = name.toLowerCase();
      this.setState({
        cards: baseData.cards.filter((card) => {
          if(!card[NAME].toLowerCase().includes(lcName)) {
            return false;
          }
          if (max && parseInt(card[COST][0], 10) > max) {
            return false;
          }
          if (min && parseInt(card[COST][0], 10) < min) {
            return false;
          }
          if (types.length) {
            let matched = false;
            for(let cardType of card[TYPE]) {
              for(let selectedType of types) {
                if (cardType === selectedType) {
                  matched = true;
                  break;
                }
              }
            }
            if (!matched) {
              return false;
            }
          }
          if (sets.length) {
            let matched = false;
            for(let cardSet of card[SET]) {
              for(let selectedSet of sets) {
                if (cardSet === selectedSet) {
                  matched = true;
                  break;
                }
              }
            }
            if (!matched) {
              return false;
            }
          }
          if (tags.length) {
            let matched = false;
            for(let cardTag of card[TAGS]) {
              for(let selectedTag of tags) {
                if (cardTag === selectedTag) {
                  matched = true;
                  break;
                }
              }
            }
            if (!matched) {
              return false;
            }
          }
          return true;
        }),
      })
    }
  }
  render() {
    const {
      min,
      max,
      cards,
      name,
      baseData,
    } = this.state;
    const rows = cards.map(card => ({
      cells: [
        {
          key: card[NAME],
          content: card[NAME],
        },
        {
          key: card[COST][0],
          content: (
            <div className="costTableCell">
              {card[COST].map(cost => cost === "Potion" ?
                <PotionIcon key="potion"/>
                : <Lozenge isBold appearance="moved" key="cost">{cost}</Lozenge>
              )}
            </div>
          ),
        },
        {
          key: card[TYPE][0], // Key shouldn't matter because we're not sorting on this column?
          content: card[TYPE].join(", "),
        },
        // {
        //   key: card[TAGS][0], // Key shouldn't matter because we're not sorting on this column?
        //   content: card[TAGS].join(", "),
        // },
        {
          // If the length is more than 1, then we've got a 1st vs 2nd edition situation. We can
          // sort on whichever, because the sort will come in based on the name (unless you're
          // comparing "Dominion (1st Edition)" and "Dominion (2nd Edition)" the part in the parens
          // doesn't matter)
          key: card[SET][0],
          // Get rid of the first/second edition stuff. Our filter can still filter on them, but the
          // table doesn't really need to show them. The only thing that really matters is if it's
          // only in first/second edition.
          content: card[SET].length === 1 ? card[SET][0] : card[SET][0].match(/^(.+?)( \(.+\))?$/)[1],
        },
      ],
      key: card[NAME]
    }));
    return (
      <AtlaskitThemeProvider mode="light">
        <Page>
          <Grid>
            <GridColumn>
              <PageHeader
                bottomBar={(
                  <Grid>
                    <GridColumn medium={6}>
                      <div className="fullWidthText">
                        <FieldText
                          label="Name"
                          placeholder="Search..."
                          value={name}
                          onChange={e => this.setState({ name: e.target.value })}
                        />
                      </div>
                    </GridColumn>
                    <GridColumn medium={6}>
                      <div className="fullWidthSelect">
                        <MultiSelect
                          label="Expansion"
                          placeholder="All Expansions"
                          items={baseData.sets.map(set => ({ value: set, content: set }))}
                          onSelectedChange={({ items }) => this.setState({ sets: items.map(item => item.value)})}
                        />
                      </div>
                    </GridColumn>
                    <GridColumn medium={6}>
                      <div className="fullWidthSelect">
                        <MultiSelect
                          label="Type"
                          placeholder="All types"
                          items={baseData.types.map(type => ({ value: type, content: type }))}
                          onSelectedChange={({ items }) => this.setState({ types: items.map(item => item.value)})}
                        />
                      </div>
                    </GridColumn>
                    <GridColumn medium={6}>
                      <Label label={`Max Cost (${min})`} />
                      <div className="costSliderContainer">
                        <FieldRange
                          step={1}
                          min={baseData.min}
                          max={baseData.max}
                          value={min}
                          onChange={value => this.setState({ min: value })}
                        />
                      </div>
                    </GridColumn>
                    <GridColumn medium={6}>
                      <div className="fullWidthSelect">
                        <MultiSelect
                          label="Tags"
                          placeholder="All tags"
                          items={baseData.tags.map(tag => ({ value: tag, content: tag }))}
                          onSelectedChange={({ items }) => this.setState({ tags: items.map(item => item.value)})}
                        />
                      </div>
                    </GridColumn>
                    <GridColumn medium={6}>
                      <Label label={`Max Cost (${max})`} />
                      <div className="costSliderContainer">
                        <FieldRange
                          step={1}
                          min={baseData.min}
                          max={baseData.max}
                          value={max}
                          onChange={value => this.setState({ max: value })}
                        />
                      </div>
                    </GridColumn>
                  </Grid>
                )}
              >
                Dominionator
              </PageHeader>
              <DynamicTable
                head={HEAD}
                rows={rows}
                rowsPerPage={10}
                defaultPage={1}
                isLoading={false}
                isFixedSize
                defaultSortKey={NAME}
                defaultSortOrder="ASC"
              />
            </GridColumn>
          </Grid>
        </Page>
      </AtlaskitThemeProvider>
    );
  }
}

export default App;
