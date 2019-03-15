# ChangeCast

Create a beautiful, performant, accessible changelog from your Github releases.

## Steps

### 1. Deploy

#### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/palmerhq/changecast)

You will be prompted for the following information:

- **Github repository url**: Enter the url of a Github repository _(e.g. https://github.com/facebook/react)_.
- **Github access token (optional for public repos)**: [Generate](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line) and enter an access token with `repo` scope.

After deploying, you can assign a custom domain for your changelog [using Netlify](https://www.netlify.com/docs/custom-domains/).

### 2. Add a Build Trigger

In order to rebuild whenever a Github release is published, we want to add a webhook for Github releases to Netlify. The steps to do so are:

1. [Create a build hook](https://www.netlify.com/docs/webhooks/#incoming-webhooks) in Netlify.
2. Create a webhook in the Github repository (https://github.com/<owner>/<name>/settings/hooks/new).
3. Copy the build hook URL from Netlify into the Github "Payload URL".
4. In the Github webhook under "Which events would you like to trigger this webhook?", select "Let me select individual events." and "Releases".

You're all set! Now your changelog page and widget will rebuild whenever a new release is published.
