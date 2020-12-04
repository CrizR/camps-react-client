import React, {useEffect, useState} from 'react';
import "./DashboardStyle.css"
import {
    Button,
    Container,
    Dimmer,
    Dropdown,
    Grid, Header, Image,
    Input,
    Loader,
    Menu,
    Pagination,
    Segment
} from "semantic-ui-react";
import CampsiteCard from "../../components/card/CampgroundCard";
import NavBarComponent from "../../components/navbar/NavBarComponent";
import {connect} from "react-redux";
import {filterCampsitesAction, getCampgroundsAction, setPageNumberAction} from "../../actions/DashboardActions";
import {parkCodes} from "../../assets/parkCodes";
import bg from "../../assets/bg.png"

const parkOptions = parkCodes.map((code, i) => ({
    key: i,
    text: code,
    value: code,
}));


const LIMIT = 100;
export const RESULTS_PER_PAGE = 6;

const DashboardContainer = ({searchTermParam, parkCodeParam, getCampsites, filtered, pageResults, filterCampsites, pageNumber, setPageNumber}) => {
    const [parkCode, setParkCode] = useState(!!parkCodeParam ? parkCodeParam : "");
    const [searchInput, setSearchInput] = useState(!!searchTermParam ? searchTermParam : "");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCampsites(parkCode, LIMIT, 0, searchInput).then(() => {
            setLoading(false);
        });

        console.log(searchTermParam);
        console.log(parkCodeParam)

    }, []);


    function searchCampsites() {
        window.history.replaceState("", "", `/${parkCode}/${searchInput}`);
        setLoading(true);
        getCampsites(parkCode, LIMIT, 0, searchInput).then(() => {
            setLoading(false);
        });
    }

    function pageChange(activePage) {
        setLoading(true);
        setPageNumber(activePage).then(() => {
            setLoading(false);
        });
    }


    return (
        <>
            <NavBarComponent/>
            <Image className={'camps-bg-image'} src={bg}/>
            <div className={'camps-dashboard'}>
                <Container>
                    <Menu secondary className={'camps-menu'}>
                        <Menu.Item className="camps-dashboard-menu-item">
                            <h2>Campgrounds</h2>
                        </Menu.Item>
                        <Menu.Item
                            className="aligned camps-search-campground">
                            <Input type='text'
                                   value={searchInput}
                                   onChange={(e) => setSearchInput(e.target.value)}
                                   placeholder='Search Term' action>
                                <input/>
                                <Dropdown placeholder='Select Park Code' value={parkCode}
                                          onChange={(e, {value}) => setParkCode(value)}
                                          search selection options={parkOptions}/>
                                <Button
                                    className={'camps-secondary-button'}
                                    onClick={() => searchCampsites()}
                                    type='submit'>Search</Button>
                            </Input>
                        </Menu.Item>
                    </Menu>
                    <Segment className={'camps-dashboard-campgrounds'}>
                        <div className={'camps-dashboard-grid-search'}>
                            <Input onChange={(e) => filterCampsites(e.target.value)}
                                   placeholder='Campground Name'/>
                        </div>
                        {loading ?
                            <Dimmer className={'camps-dashboard-loader'} active inverted>
                                <Loader inverted>Loading</Loader>
                            </Dimmer>
                            :
                            <>
                                {!!pageResults.length ?
                                    <Grid stackable centered columns={3}>
                                        {pageResults.map((campground, i) =>
                                            <Grid.Column key={i}>
                                                <CampsiteCard campground={campground}/>
                                            </Grid.Column>
                                        )}
                                    </Grid> :
                                    <h4>No Results</h4>
                                }

                                <Pagination
                                    className={'camps-dashboard-pagination'}
                                    boundaryRange={0}
                                    activePage={pageNumber}
                                    onPageChange={(e, {activePage}) => pageChange(activePage)}
                                    ellipsisItem={null}
                                    firstItem={null}
                                    lastItem={null}
                                    totalPages={Math.ceil(filtered.length / RESULTS_PER_PAGE)}
                                    pointing
                                />


                            </>
                        }

                    </Segment>
                </Container>
            </div>
        </>
    );

};

const stateToProperty = (state) => ({
    filtered: state.DashboardReducer.filtered,
    pageResults: state.DashboardReducer.pageResults,
    total: state.DashboardReducer.total,
    pageNumber: state.DashboardReducer.pageNumber
});

const propertyToDispatchMapper = (dispatch) => ({
    getCampsites: (parkCode, limit, start, query) => getCampgroundsAction(dispatch, parkCode, limit, start, query),
    setPageNumber: (page) => setPageNumberAction(dispatch, page),
    filterCampsites: (term) => filterCampsitesAction(dispatch, term)
});

export default connect
(stateToProperty, propertyToDispatchMapper)
(DashboardContainer)
