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
import CampsiteCard from "../../components/card/CampsiteCard";
import NavBarComponent from "../../components/navbar/NavBarComponent";
import {connect} from "react-redux";
import {getCampsitesAction, setPageNumberAction} from "../../actions/DashboardActions";
import {useAuth0} from "@auth0/auth0-react";
import {parkCodes} from "../../assets/parkCodes";
import bg from "../../assets/bg.png"

const parkOptions = parkCodes.map((code, i) => ({
    key: i,
    text: code,
    value: code,
}));


const LIMIT = 100;
export const RESULTS_PER_PAGE = 6;

const DashboardContainer = ({getCampsites, filtered, total, pageNumber, setPageNumber}) => {
    const {getAccessTokenSilently, user} = useAuth0();
    const [parkCode, setParkCode] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCampsites(parkCode, LIMIT, 0, searchInput).then(() => {
            setLoading(false)
        });
    }, []);



    function searchCampsites() {
        setLoading(true);
        getCampsites(parkCode, LIMIT, 0, searchInput).then(() => {
            setLoading(false)
        });
    }

    function pageChange(activePage) {
        setLoading(true);
        setPageNumber(activePage).then(() => {
            setLoading(false)

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
                            className="aligned camps-search-campsite">
                            <Input type='text'
                                   onChange={(e) => setSearchInput(e.target.value)}
                                   icon={'search'}
                                   placeholder='Search' action>
                                <input/>
                                <Dropdown placeholder='Select Park Code' value={parkCode}
                                          onChange={(e, {value}) => setParkCode(value)}
                                          search selection options={parkOptions}/>
                                <Button
                                    className={'camps-primary-button'}
                                    onClick={() => searchCampsites()}
                                    type='submit'>Search</Button>
                            </Input>
                        </Menu.Item>
                    </Menu>
                    <Segment className={'camps-dashboard-campgrounds'}>
                        {loading ?
                            <Dimmer className={'camps-dashboard-loader'} active inverted>
                                <Loader inverted>Loading</Loader>
                            </Dimmer>
                            :
                            <>
                                {!!filtered.length ?
                                    <Grid stackable centered columns={3}>
                                        {filtered.map((campsite, i) =>
                                            <Grid.Column key={i}>
                                                <CampsiteCard campsite={campsite}/>
                                            </Grid.Column>
                                        )}
                                    </Grid> :
                                    <h4>No Results</h4>
                                }

                                <Pagination
                                    className={'camps-dashboard-pagination'}
                                    boundaryRange={0}
                                    activePage={pageNumber}
                                    defaultActivePage={1}
                                    onPageChange={(e, {activePage}) => pageChange(activePage)}
                                    ellipsisItem={null}
                                    firstItem={null}
                                    lastItem={null}
                                    totalPages={Math.ceil(total / RESULTS_PER_PAGE)}
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
    total: state.DashboardReducer.total,
    pageNumber: state.DashboardReducer.pageNumber
});

const propertyToDispatchMapper = (dispatch) => ({
    getCampsites: (parkCode, limit, start, query) => getCampsitesAction(dispatch, parkCode, limit, start, query),
    setPageNumber: (page) => setPageNumberAction(dispatch, page)
});

export default connect
(stateToProperty, propertyToDispatchMapper)
(DashboardContainer)
