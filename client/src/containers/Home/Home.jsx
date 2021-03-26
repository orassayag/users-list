import React, { Component, Fragment } from 'react';
import socketIOClient from 'socket.io-client';
import settings from '../../settings/settings';
import '../Home/Home.less';
import { getUsers } from '../../api/routes/users';
import { Loader, Item } from '../../components/UI';

class Home extends Component {
    state = {
        pageNumber: 1,
        preventLoadMore: false,
        displayLargeLoader: true,
        displaySmallLoader: false,
        hasMore: true,
        error: false,
        users: []
    };

    top = 50;
    socket = socketIOClient(settings.api_base_url);

    constructor(props) {
        super(props);

        this.handleOnScroll = this.handleOnScroll.bind(this);
        this.lastElement = React.createRef();
    }

    handleOnScroll = (e) => {
        e.preventDefault();

        const { error, loadUsers,
            state: {
                preventLoadMore,
                pageNumber,
                displayLargeLoader,
                displaySmallLoader,
                hasMore
            }
        } = this;

        if (error || displayLargeLoader || displaySmallLoader || !hasMore || preventLoadMore) {
            return;
        }

        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            setTimeout(() => {
                loadUsers({
                    isFirstTime: false,
                    pageNumber: pageNumber,
                    top: this.top
                });
            }, 200);
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleOnScroll, true);

        this.loadUsers({
            isFirstTime: true,
            pageNumber: this.state.pageNumber,
            top: this.top
        });

        this.socket.on('newUsers', (newUsers) => {
            this.addedUsers(newUsers, true);
        });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleOnScroll);
    }

    addedUsers = (newUsers, preventLoadMore) => {
        this.setState({
            preventLoadMore: preventLoadMore,
            users: [
                ...this.state.users,
                ...newUsers
            ]
        });
        this.scrollToLastElement(preventLoadMore);
    };

    loadUsers = (data) => {
        this.setState({ displaySmallLoader: data.isFirstTime ? false : true }, () => {
            getUsers(data)
                .then((response) => {
                    this.setState(prevState => ({
                        pageNumber: prevState.pageNumber + 1,
                        displayLargeLoader: false,
                        displaySmallLoader: false,
                        hasMore: response.length > 0,
                        users: [
                            ...this.state.users,
                            ...response
                        ]
                    }));
                })
                .catch((err) => {
                    this.setState({
                        error: err,
                        displaySmallLoader: false
                    });
                });
        });
    }

    scrollToLastElement = (preventLoadMore) => {
        const intersectionObserver = new IntersectionObserver((entries) => {
            let [entry] = entries;
            if (entry.isIntersecting) {
                setTimeout(() => {
                    this.setState({ preventLoadMore: !preventLoadMore });
                }, 100);
            }
        });

        // Start observing.
        intersectionObserver.observe(this.lastElement.current);

        // Scroll into an element.
        this.lastElement.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
        });
    }

    render() {
        const {
            error,
            hasMore,
            displayLargeLoader,
            displaySmallLoader,
            users
        } = this.state;

        return (
            <div>
                {displayLargeLoader && <div><Loader /></div>}
                {!displayLargeLoader &&
                    <div className="container" >
                        <div className="table">
                            <div className="table-header">
                                <div className="header__item">Name</div>
                                <div className="header__item">Position</div>
                                <div className="header__item">Salary</div>
                            </div>
                            <div className="table-content">
                                {users.map(user => (
                                    <Fragment key={user.id}>
                                        <Item items={[user.name, user.position, user.monthlySalary]} ref={this.lastElement} />
                                    </Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                }
                {displaySmallLoader &&
                    <div className="table-content"><Loader isSmall /></div>
                }
                {error &&
                    <div className="error">
                        {error}
                    </div>
                }
                {!hasMore &&
                    <div>You did it! You reached the end!</div>
                }
            </div>
        );
    }
}

export default Home;