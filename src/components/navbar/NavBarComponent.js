import React from 'react';
import './NavBarStyle.css'
import {Link} from 'react-router-dom'
import {Dropdown, Menu} from 'semantic-ui-react'
import logo from "../../assets/logo.png"
import {useAuth0} from "@auth0/auth0-react";

export function NavBarComponent() {
    const {logout, user} = useAuth0();

    return (

        <div className={'camps-navbar'}>
            <div style={{background: 'white', transition: 'background-color 300ms linear'}}>
                <Menu secondary>
                    <Menu.Item
                        as={Link}
                        to={'/'}
                    >
                        <div className={'logo'}><img width={100} alt={'logo'} src={logo}/></div>
                    </Menu.Item>
                    <Menu.Menu position={'right'}>
                        <Menu.Item>
                            {!!user &&
                            <Dropdown
                                text={`${user.name}`}
                                icon='user'
                                floating
                                labeled
                                button
                                className='icon'
                            >
                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        <Link to='/profile'>Profile</Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => logout()}
                                                   text='Logout'/>
                                </Dropdown.Menu>
                            </Dropdown>
                            }

                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </div>
        </div>
    );
};

export default NavBarComponent
