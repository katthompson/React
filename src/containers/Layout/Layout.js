import React, {Component} from 'react';

import {Route, Switch} from 'react-router-dom';
import Wrap from '../../hoc/Wrap/Wrap';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Home from '../../components/Home/Home';
import Form from '../../components/Form/Form';
import ThankYou from '../../components/ThankYou/ThankYou';


class Layout extends Component {
    render() {
        return (
            <Wrap>
                <Header />
                
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/form" exact component={Form} />
                    <Route path="/thank-you" exact component={ThankYou} />
                </Switch>

                <Footer />
            </Wrap>
        );
        
    }
}
export default Layout;
