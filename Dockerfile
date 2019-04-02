FROM node:10

COPY . /changecast

RUN cd /changecast && yarn

ENTRYPOINT ["/changecast/action/entrypoint.sh"]

LABEL "com.github.actions.name"="ChangeCast"
LABEL "com.github.actions.description"="Create beautiful, performant, accessible changelog sites and widgets."
LABEL "com.github.actions.icon"="radio"
LABEL "com.github.actions.color"="blue"