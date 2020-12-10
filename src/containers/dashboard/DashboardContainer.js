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
import {useAuth0} from "@auth0/auth0-react";

const parkOptions = Object.keys(parkCodes).map((k, i) => ({
    key: i,
    text: k,
    value: parkCodes[k],
}));


const LIMIT = 100;
export const RESULTS_PER_PAGE = 6;

const DashboardContainer = ({getCampsites, filtered, pageResults, filterCampsites, pageNumber, setPageNumber}) => {
    const [parkCode, setParkCode] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let currentUrlParams = new URLSearchParams(window.location.search);
        let searchTerm = !!currentUrlParams.get('searchTerm') ? currentUrlParams.get('searchTerm') : "";
        let parkCodeParam = !!currentUrlParams.get('parkCode') ? currentUrlParams.get('parkCode') : "";
        setParkCode(parkCodeParam);
        setSearchInput(searchTerm);
        getCampsites(parkCodeParam, LIMIT, 0, searchTerm).then(() => {
            setLoading(false);
        });
    }, []);


    function updateParams() {
        let currentUrlParams = new URLSearchParams(window.location.search);
        currentUrlParams.set('parkCode', parkCode);
        currentUrlParams.set('searchTerm', searchInput);
        window.history.replaceState("", "", "?" + currentUrlParams.toString());
    }

    function searchCampsites() {
        updateParams();
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
                    <Menu secondary className={'camps-menu'} stackable={true}>
                        <Menu.Item className="camps-dashboard-menu-item mobile-hidden">
                            <h2>Campgrounds</h2>
                        </Menu.Item>
                        <Menu.Item
                            className="aligned camps-search-campground">
                            <Input type='text'
                                   value={searchInput}
                                   onChange={(e) => setSearchInput(e.target.value)}
                                   placeholder='Search' action>
                                <input/>
                                <Dropdown placeholder='National Park' value={parkCode}
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
