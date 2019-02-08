# Release Notes

Create beautiful, performant, accessible release notes from your Github releases.

## Steps

### 1. Deploy to Netlify

Deploy release notes with your Netlify account using the button below.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/palmerhq/release-notes)

You will be prompted for the following information:

- **Github repository url**: Enter the URL of a Github repository _(e.g. https://github.com/facebook/react)_.
- **Github access token**: [Generate](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line) and enter an access token with `repo` scope if you are using a private repository, or `public_repo` scope if you are using a public repository.

After deploying, you can assign a custom domain for your release notes [using Netlify](https://www.netlify.com/docs/custom-domains/).

### 2. Add a Build Trigger

In order to rebuild whenever a Github release is published, we want to add a webhook for Github releases to Netlify. The steps to do so are:

1. [Create a build hook](https://www.netlify.com/docs/webhooks/#incoming-webhooks) in Netlify.
2. Create a webhook in the Github repository (https://github.com/<owner>/<name>/settings/hooks/new).
3. Copy the build hook URL from Netlify into the Github "Payload URL".
4. In the Github webhook under "Which events would you like to trigger this webhook?", select "Let me select individual events." and "Releases".

You're all set! Now your release notes page will rebuild whenever a new release is published.
