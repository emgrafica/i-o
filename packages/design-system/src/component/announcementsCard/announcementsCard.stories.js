import React from "react";
import AnnouncementsCard from "./announcementsCard";

export default {
    title: 'i-o/AnnouncementsCard',
    component: AnnouncementsCard
};

const Template = (args) => <AnnouncementsCard {...args}/>;
export const AnnouncementsCardComponent = Template.bind({});
AnnouncementsCard.args={};