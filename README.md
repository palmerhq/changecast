<p align="center">
  <img width="200" src="https://user-images.githubusercontent.com/1153686/55920627-8d5fdc00-5bc7-11e9-92d5-34dca3f66712.png" />
</p>

<div align="center">
  <h1>
    <a href="https://changecast.now.sh">
      ChangeCast
    </a>
  </h1>
</div>

## Introduction

TODO

## Getting Started

### Step One: Deploy

#### Github Actions

[Github Actions](https://github.com/features/actions) are the easiest way to deploy ChangeCast for your project.

<details>
  <summary>Instructions</summary>

You must be enrolled in the [Github Actions Beta](https://github.com/features/actions/signup) to use this method.

##### 1. Add the ChangeCast Action

```HCL
action "Build" {
  uses = "palmerhq/changecast@v1.0.0"
  secrets = [
    "GITHUB_TOKEN",
    "BASE_URL",
  ]
}
```

Note that `URL` is necessary for SEO and Open Graph tags to work properly, but ChangeCast will build without it. You can skip this for your first deployment, and redeploy once you know the deployment URL.

##### 2. Add a static deployment Action

In the example below we are using [Netlify](https://www.netlify.com), but any static deployment action should work. Simply configure the action to deploy the `./changecast` directory that is created by the ChangeCast Action.

```HCL
action "Publish with Netlify" {
  needs = "Build"
  uses = "netlify/actions/cli@master"
  args = "deploy --dir=./changecast --prod"
  secrets = [
    "NETLIFY_AUTH_TOKEN",
    "NETLIFY_SITE_ID",
  ]
}
```

Note that you can generate a new `NETLIFY_SITE_ID` by installing the [Netlify CLI](https://github.com/netlify/cli) and running `netlify sites:create`.

As a bonus you can also try the [Chronicler Action](https://github.com/marketplace/actions/chronicler-action) to help you draft release notes from PR titles.

For a full working example of deploying ChangeCast using Github Actions, check out our [changecast.workflow](https://github.com/palmerhq/changecast/blob/master/.github/changecast.workflow).

</details>

#### Netlify

[Netlify](https://www.netlify.com) is the next easiest way to deploy ChangeCast for your project.

<details>
  <summary>Instructions</summary>

##### 1. Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/palmerhq/changecast)

You will be prompted for the following information:

- **Github repository url**: Enter the url of a Github repository _(e.g. https://github.com/facebook/react)_.
- **Github access token (optional for public repos)**: [Generate](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line) and enter an access token with `repo` scope.

After deploying, you can assign a custom domain for your changelog [using Netlify](https://www.netlify.com/docs/custom-domains/).

##### 2. Add a Build Trigger

In order to rebuild whenever a Github release is published, we want to add a webhook for Github releases to Netlify. The steps to do so are:

1. [Create a build hook](https://www.netlify.com/docs/webhooks/#incoming-webhooks) in Netlify.
2. Create a webhook in the Github repository (https://github.com/{owner}/{name}/settings/hooks/new).
3. Copy the build hook URL from Netlify into the Github "Payload URL".
4. In the Github webhook under "Which events would you like to trigger this webhook?", select "Let me select individual events." and "Releases".

You're all set! Now your changelog page and widget will rebuild whenever a new release is published.

</details>

### Step Two: Embed Widget

First, add the following `script` tag to your site header. `BASE_URL` should be the deployment URL of your ChangeCast site.

```html
<script src="{BASE_URL}/widget.js" defer="true"></script>
```

Next, add the `data-toggle-changecast` attribute to any clickable elements that you want to toggle the ChangeCast widget.

```html
<button data-toggle-changecast="true">What's new?</button>
```

## Contributing

TODO
