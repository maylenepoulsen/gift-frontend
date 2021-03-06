import React, { Component } from "react";

import NavBar from "./components/NavBar";
import AddGift from "./components/AddGift";
import ShowGiftIdeas from "./components/ShowGiftIdeas";
import Post from "./components/Post";
import ListPosts from "./components/ListPosts";

import "bootstrap/dist/css/bootstrap.min.css";

class GroupHomePage extends Component {
  state = {
    group: "",
    members: [],
    recipients: [],
    giftIdeas: [],
    posts: [],
    admin: "",
    category: '',
    date: '',
    showModal: false,
  };

  close = () => {
    this.setState({ showModal: false });
  };

  open = () => {
    this.setState({ showModal: true });
  };

  componentDidMount() {
    const id = this.props.routerProps.match.params.id;
    fetch(`http://localhost:3001/api/v1/groups/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        const date = this.getDate(result.recipients)

        this.setState({
          group: result.group,
          admin: result.admin,
          date: date,
          category: result.category,
          members: result.members,
          recipients: result.recipients,
          giftIdeas: result.gifts.flat(),
          posts: result.posts,
        });
      });
  }

  addNewPost = (post) => {
    this.setState({
      posts: [...this.state.posts, post],
    });
  };

  handleAddGift = (gift) => {
    fetch("http://localhost:3001/api/v1/gifts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(gift),
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          recipients: [...this.state.recipients],
          giftIdeas: [...this.state.giftIdeas, result],
        });
      });
  };

  getDate = (recipients) => {
    let recipient = recipients[0]
    let date = recipient.event_date
    let split = date.split('-')
    split.push(split.shift())
    return split.join('/')
  }

  render() {
    const recipientTitle = this.state.recipients.map(
      (recipient) => recipient.name
    );

    let recipientBudget = this.state.recipients.map(
      (recipient) => recipient.budget
    );
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let amount = 0;
    if (recipientBudget.length > 0) {
      amount = recipientBudget.reduce(reducer);
    }

    return (
      <div>
        <NavBar
          currentUser={this.props.currentUser}
          handleLogout={this.props.handleLogout}
          routerProps={this.props.routerProps}
        />
        <div className="welcome-user">
          {this.state.group.name} Group: Group Gift for{" "}
    {recipientTitle.join(" + ")}<div className='category'>Event: {this.state.category}<span className='event-date'>Date: {this.state.date}</span></div>
        </div>
        <div className="budget-for-gifts">Budget for gifts: {`$${amount}`}</div>
        <div className="group-div">
          <h4 className="group-members-title">Group Members</h4>
          <ul className="group-member-ul">
            <li>{this.state.admin.name}</li>
            {this.state.members.map((member) => (
              <li key={member.id}>{member.name}</li>
            ))}
          </ul>
        </div>
        <div className="post-div">
          <div className="list-posts-div">
            <ListPosts posts={this.state.posts} members={this.state.members} />
          </div>
          <div className="add-post-div">
            <Post
              currentUser={this.props.currentUser}
              group={this.state.group}
              addNewPost={this.addNewPost}
            />
          </div>
        </div>
        <div className="gift-div">
          <div>
            <ShowGiftIdeas
              gifts={this.state.giftIdeas}
              recipients={this.state.recipients}
              currentUser={this.props.currentUser}
            />
          </div>
          <div>
            <button onClick={this.open} className="add-a-gift-idea">
              Add A Gift Idea
            </button>
            <AddGift
              showModal={this.state.showModal}
              onClose={this.close}
              handleAddGift={this.handleAddGift}
              recipients={this.state.recipients}
              addGiftToGiftIdeas={this.addGiftToGiftIdeas}
            />
          </div>
        </div>
        <div className='group-svg'>
          <div className='group-svg-one'>
            <svg
              width="80"
              height="83"
              viewBox="0 0 49 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M49 8.32941H35.6736C37.2528 7.69801 38.6532 6.80662 39.1672 5.56611C39.6812 4.32559 39.3907 3.17422 38.3627 1.85199C37.9439 1.2604 37.3844 0.781724 36.7343 0.458903C36.0843 0.136083 35.364 -0.0207875 34.6382 0.00236247C30.5933 0.143499 26.0792 5.64039 24.5 7.80201C22.8389 5.64039 18.3322 0.143499 14.2948 0.00236247C13.5688 -0.0214547 12.8484 0.135123 12.1982 0.457999C11.548 0.780875 10.9886 1.25991 10.5702 1.85199C9.54226 3.16679 9.27409 4.4073 9.76573 5.56611C10.2574 6.72491 11.6876 7.69801 13.2668 8.32941H0V19.0112H3.43402V52H45.5585V19.0112H49V8.32941ZM28.3884 19.0112V50.5144H20.6637V9.81506H28.3884V19.0112ZM34.6754 1.48801C35.1655 1.47853 35.6501 1.5919 36.0848 1.81772C36.5195 2.04355 36.8904 2.3746 37.1634 2.78052C38.169 4.05818 37.8711 4.75643 37.7742 5.00899C36.9548 6.90319 32.0236 8.062 29.0886 8.3517H25.9228C27.9117 5.75924 31.7182 1.592 34.6754 1.48801ZM11.1438 4.97928C11.047 4.749 10.749 4.05075 11.7546 2.75081C12.0316 2.35086 12.4041 2.02599 12.8384 1.80553C13.2728 1.58506 13.7554 1.47594 14.2426 1.48801C17.2223 1.58458 21.0138 5.75182 22.9953 8.32199H19.8294C16.887 8.03971 11.9558 6.88091 11.1438 4.98671V4.97928ZM1.46002 17.5181V9.81506H19.1739V17.5256H1.48981L1.46002 17.5181ZM4.89404 19.0038H19.1739V50.5144H4.92384L4.89404 19.0038ZM44.0687 50.5144H29.9155V19.0112H44.0687V50.5144ZM47.5102 17.533H29.8782V9.81506H47.5102V17.533Z"
                fill="#3E6B89"
              />
            </svg>
          </div>
          <div className='group-svg-two'>
            <svg
              width="70"
              height="106"
              viewBox="0 0 39 75"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.3466 45.9315C20.7464 45.9315 23.5122 42.9135 23.5122 39.2033C23.5122 35.4936 20.7464 32.4756 17.3466 32.4756C13.9464 32.4756 11.1805 35.4936 11.1805 39.2033C11.1805 42.9135 13.9464 45.9315 17.3466 45.9315ZM17.3466 34.3506C19.7987 34.3506 21.7939 36.5277 21.7939 39.2033C21.7939 41.8794 19.7987 44.0565 17.3466 44.0565C14.8941 44.0565 12.8989 41.8794 12.8989 39.2033C12.8989 36.5277 14.8941 34.3506 17.3466 34.3506Z"
                fill="#3DD2CC"
              />
              <path
                d="M26.3506 30.7343C29.7504 30.7343 32.5163 27.7162 32.5163 24.0061C32.5163 20.2964 29.7504 17.2783 26.3506 17.2783C22.9504 17.2783 20.1846 20.2964 20.1846 24.0061C20.1846 27.7162 22.9504 30.7343 26.3506 30.7343ZM26.3506 19.1533C28.8027 19.1533 30.7979 21.3304 30.7979 24.0061C30.7979 26.6822 28.8027 28.8593 26.3506 28.8593C23.8981 28.8593 21.9029 26.6822 21.9029 24.0061C21.9029 21.3304 23.8981 19.1533 26.3506 19.1533Z"
                fill="#3DD2CC"
              />
              <path
                d="M25.5486 53.1583C22.1488 53.1583 19.3829 56.1763 19.3829 59.8865C19.3829 63.5962 22.1488 66.6142 25.5486 66.6142C28.9483 66.6142 31.7142 63.5962 31.7142 59.8865C31.7142 56.1763 28.9483 53.1583 25.5486 53.1583ZM25.5486 64.7392C23.0965 64.7392 21.1013 62.5621 21.1013 59.8865C21.1013 57.2104 23.0965 55.0333 25.5486 55.0333C28.0006 55.0333 29.9959 57.2104 29.9959 59.8865C29.9959 62.5621 28.0006 64.7392 25.5486 64.7392Z"
                fill="#3DD2CC"
              />
              <path
                d="M0.85917 75H37.9801C38.4546 75 38.8393 74.5802 38.8393 74.0625V10.605C38.8393 10.0873 38.4546 9.66751 37.9801 9.66751H34.5836C35.6711 8.03467 36.3135 5.7696 35.8334 3.82599C35.4806 2.39731 34.1969 0 29.5642 0C25.9204 0 22.5511 1.84948 20.5811 4.8452C20.2077 4.74375 19.8202 4.6843 19.4199 4.6843C19.0194 4.6843 18.6318 4.74375 18.2583 4.84526C16.2882 1.84954 12.919 0 9.2751 0C4.64237 0 3.35865 2.39731 3.00542 3.82645C2.52533 5.77 3.16793 8.03484 4.25553 9.66751H0.85917C0.384697 9.66751 0 10.0873 0 10.605V74.0625C0 74.5802 0.384697 75 0.85917 75ZM1.71834 50.8034C3.90282 51.109 5.60307 53.1286 5.60307 55.594C5.60307 58.0594 3.90282 60.079 1.71834 60.3847V50.8034ZM1.71834 24.5062C3.90282 24.8119 5.60307 26.8315 5.60307 29.2969C5.60307 31.7623 3.90282 33.7819 1.71834 34.0875V24.5062ZM9.34107 73.125C9.56032 70.6711 11.4396 68.7396 13.745 68.7396C16.0505 68.7396 17.9298 70.6711 18.149 73.125H9.34107ZM37.1209 49.3063C34.9866 48.9517 33.3407 46.9535 33.3407 44.5271C33.3407 42.1004 34.9866 40.1021 37.1209 39.7475V49.3063ZM29.5642 1.875C31.3924 1.875 33.6763 2.29797 34.1747 4.31396C34.6624 6.2895 33.3613 8.77819 32.1777 9.66751H24.3844C24.1975 7.98328 23.3655 6.52605 22.1763 5.63009C23.8523 3.29876 26.5971 1.875 29.5642 1.875ZM22.6478 9.66751H16.1911C16.4811 7.90037 17.8162 6.5593 19.4199 6.5593C21.0231 6.5593 22.3578 7.90037 22.6478 9.66751ZM17.3194 11.5425C17.0208 13.9041 15.1782 15.7352 12.9329 15.7352C10.6879 15.7352 8.8453 13.9041 8.54676 11.5425H17.3194ZM4.66461 4.31442C5.16257 2.29843 7.44684 1.875 9.2751 1.875C12.2422 1.875 14.987 3.29876 16.6629 5.63009C15.4736 6.52611 14.6414 7.98328 14.4545 9.66751H6.66156C5.47789 8.77819 4.17655 6.28996 4.66461 4.31442ZM6.79785 11.5425C7.10294 14.9435 9.7373 17.6102 12.9329 17.6102C16.1288 17.6102 18.7632 14.9435 19.0683 11.5425H37.1209V37.84C34.034 38.2043 31.6223 41.0631 31.6223 44.5271C31.6223 47.9907 34.034 50.8495 37.1209 51.2138V73.125H19.889C19.6674 69.6333 17.0002 66.8646 13.745 66.8646C10.4899 66.8646 7.82268 69.6333 7.60112 73.125H1.71834V62.2907C4.85507 61.9793 7.32141 59.0965 7.32141 55.594C7.32141 52.0915 4.85507 49.2088 1.71834 48.8973V35.9936C4.85507 35.6821 7.32141 32.7994 7.32141 29.2969C7.32141 25.7944 4.85507 22.9116 1.71834 22.6002V11.5425H6.79785Z"
                fill="#3DD2CC"
              />
            </svg>
          </div>
          <div className='group-svg-three'>
            <svg
              width="60"
              height="101"
              viewBox="0 0 29 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.8825 10.2209V8.727C19.5702 8.4687 20.0624 7.8165 20.0624 7.0484V1.80101C20.0624 0.808018 19.2435 0 18.2372 0H10.7628C9.75648 0 8.93764 0.808018 8.93764 1.80101V7.0484C8.93764 7.8165 9.42982 8.4687 10.1175 8.727V10.2407C10.1189 10.3093 10.2172 17.1349 6.93563 22.6117C4.34154 26.9409 0 34.1865 0 48.8718V66.8375C-9.81832e-08 68.5812 1.4435 70 3.21732 70H25.7827C27.5565 70 29 68.5812 29 66.8375V48.8718C29 35.3475 25.5741 28.4836 22.0649 22.6122C18.8039 17.1576 18.8811 10.3065 18.8825 10.2209ZM12.0811 10.2209V8.84893H16.9189V10.2034C16.9155 10.3971 16.8829 13.417 17.7944 17.1226H11.2131C12.127 13.4131 12.0852 10.4007 12.0811 10.2209ZM10.9013 1.93773H18.0987V6.9112H10.9013V1.93773ZM8.62603 23.5976C9.51348 22.1164 10.1728 20.5631 10.6638 19.0603H18.3422C18.8323 20.5649 19.4898 22.1185 20.3735 23.5967C21.1118 24.8321 21.844 26.1197 22.541 27.5045L14.5002 33.4424L6.45586 27.5021C7.15358 26.1178 7.88672 24.8315 8.62603 23.5976ZM27.0016 46.6914H1.99836C2.23028 38.8986 3.69925 33.5589 5.60107 29.2914L13.912 35.4284C14.0865 35.557 14.2931 35.6214 14.5002 35.6214C14.7073 35.6214 14.914 35.557 15.0885 35.4284L23.3949 29.2944C25.2982 33.5689 26.7691 38.9098 27.0016 46.6914ZM1.96366 48.8718C1.96366 48.7884 1.96726 48.7121 1.9675 48.6292H27.0324C27.0327 48.7121 27.0363 48.7884 27.0363 48.8718V60.2527H1.96366V48.8718ZM25.7827 68.0623H3.21732C2.52601 68.0623 1.96366 67.513 1.96366 66.8375V62.1904H27.0363V66.8375C27.0363 67.513 26.474 68.0623 25.7827 68.0623Z"
                fill="#3E6B89"
              />
            </svg>
          </div>
        </div>
        <div>
          {this.props.currentUser.id === this.state.group.admin_user_id ? (
            <button className="delete-group">Delete Group</button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }
}

export default GroupHomePage;
