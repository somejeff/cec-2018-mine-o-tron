
# CEC 2018 Mine-o-Tron 5000:tm: :arrow_upper_left: <sub>(Not really)</sub>

## :warning: Read Me First!
**Full Disclosure** This project was created post-competition as an academic exercise only, purely to demonstrate an alternate approach to the challenge. None of this content was disclosed until after competition and judging.

**Get the most out of this exercise**  Just looking at the end picture is not the goal of this exercise, the best way to learn from it is to look at the [commit history](https://github.com/somejeff/cec-2018-mine-o-tron/commits/develop) starting from the beginning, [Issues](https://github.com/somejeff/cec-2018-mine-o-tron/issues?utf8=%E2%9C%93&q=is%3Aissue) and Milestones, and releases.  Also, you can go to [The Zenhub Scrum Board](https://app.zenhub.com/workspace/o/somejeff/cec-2018-mine-o-tron/boards?repos=124766172)


## Design Process and Justifications
### Agile vs Waterfall
We've chosen an agile methodology as an iterative approach, focus on the following goals:

#### Return on Investment
By delivering a minimum viable product (MVP) to our customer as soon possible will allow them to build a hub and start reaping the benefits well ahead of the competitors.

> During simulation, if there's a positive ROI ( :moneybag: :chart_with_upwards_trend: = :thumbsup: ), we will ship it.

#### Iteration and Continuous improvement
We'll take customer feedback and work on creating a better algorithm and user experience.

> If it **works**, who cares if it looks good, I'll buy it.  *<sub>- Ol' Musky Accounting Dept.</sub>*

> If it **looks** good, who cares if it works, I'll buy it.  *<sub>- Ol' Musky Marketing Dept.</sub>*

> If it looks good **and** works, I'll keep using it .  *<sub>- Ol' Musky Customer</sub>*

The requirements indicate that the goal is to make more money, therefore a better algorithm takes precedence over user experience.

> During simulation, if there ROI is better than the previous MVP, we will ship it.

As pointed out in this chart, our three Minimum Viable Products (MVP) delivered consistent improvements to the Return on Investment.
![image](https://user-images.githubusercontent.com/5151941/37320542-96171a92-264a-11e8-8f31-50ce4a4e5993.png)

* MVP-1 allowed an immediate ROI well ahead of schedule. The customer found that even though it may cost $50MM to build and deploy a single hub in a random location with ore, it still had a positive ROI.
* MVP-2 had some added benefits of choosing a better location and moving around.
* MVP-3 took the ROI from MVP-2 to scale up to multiple hubs.




#### The K.I.S.S.T.W.D.W.T.T.T.T.T.T.T.T.W.E Principle
Keep It Simple So That We Don't Waste Tremendous Time Totally Trying To Tackle The Whole Enchilada



---

### Scrum Tools and Plan
- Source Control: Github
- Scrum Board: Zenhub 

**Sprint 0** is an initial investment of time before actually starting
- Understand the requirements
- Create enough user stories to get started
- Decide on a programming language
- Setup tools and environment
- Validate API

**Sprint Length: 1 hour** The team has decided a length of 60 Minutes, this will allow 
for:
- 5-10 minutes discussing and understanding the story
- 45 minutes of development and testing
- 5 minutes of demo

We believe that after Sprint 0, we should have enough time for around 6 sprints before the competition ends.  

## Critique of the design

As we started in the browser console, and noticed that we could actually continue leveraging the provided user interface and the browser's JavaScript engine. A quick refresh of the browser page cleans up our environment for another test run.  This allowed us to quickly prototype.

Because we were able to keep the initial lines of code short, we felt comfortable hard coding most values and only refactor if we felt that it was become too complex or unreadable.  For example, instead of placing the token as a variable, we realized that if the token ever changes, we can simply use a text editor's "Find and Replace".

Similarly, we hard-coded the Hub ID, and only in MVP-3 did we start ramping up more than one hub.  