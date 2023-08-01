# Make your own ferdysauce.xyz

## Why it was made

I love the ferdy memes, as we all do, but I'm not really a 'store memes in folder for future use' kind of guy. So I
wanted a site where I could just quickly go to grab a meme that I wanted to use.

But I'm not a front-end eng and I didn't have one available to do the work for me.

## How it was made

So I had ChatGPT4 do it. Here's the original prompt I used:

```
i'm trying to display a list of images in a gallery format. the images should display four across, and scroll downwards until all the images are displayed.

the images are located at https://ferdyflip.com/images/x.png, where x is the number of the image. we don't know how many images there are, so it should attempt to display images until one of the images is not found.

can you write the HTML necessary to accomplish this?
```

I iterated on it a bit until I had what I wanted. It made a few mistakes, that it was also able to automatically clean
up for me.

I probably manually edited only a few lines of html/css to get the end results.

## How to set up your own xyz-sauce

1) Fork or download this repo.
2) All your memes go in `site/images`. Remove the existing sample one.
3) Replace `banner.png`, `icon.png`, and `social.png` with appropriate images for your site.
4) Edit `index.html` to replace all mentions of Ferdy with whatever you're launching.
5) Run `python make_json.py`. This will rebuild `site/images.json` based on the contents of `site/images'.
6) Deploy.

The `images.json` file is automatically generated. You could also manually manage it; if you're thinking of doing that,
it's probably because you are scared of running a Python script, but don't be! It's not that hard. And really, it will
be terrible to manage manually.

## Recommended 'development environment'

Fork this repo instead of downloading it.

You probably won't do much development here, but I recommend
using [PyCharm](https://www.jetbrains.com/pycharm/download/) (the community edition, which is free).

You can use it to check out the repo that you forked. Make your changes including adding the new images, run the python
script, commit them, and push them back to your repo. This way you can never lose them.

Bonus! You can share the repo, have a few retards in charge of uploading the memes, and then the least retarded person
on your team can handle the deployment stuff.

## Deployment

I recommend you use the dumbest and easiest form of deploying a website, backing it with an AWS bucket.

After writing this, I realized that maybe it's a bit intimidating for a non-technical person. But persevere! This is a
very cheap setup and requires no maintenance.

1) Sign up for AWS.
2) Sign up for CloudFlare and register the domain you want.
3) [Create an S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html). The name
   should match the site you want to host, e.g. for https://ferdysauce.xyz I'm using a bucket called `ferdysauce.xyz`.
4) Upload the files. You can use the 'Upload a folder' feature, but I recommend installing the AWS CLI and using it
   instead, e.g. `aws s3 sync site s3://ferdysauce.xyz`. You'll be doing this repeatedly, and it's just easier to use
   a command instead of clicking through the buttons.
5) You need to [enable website hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/EnableWebsiteHosting.html)
   on the bucket. You can do that via the S3 web console.
6) You need
   to [change the policy](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-policy-language-overview.html?icmpid=docs_amazons3_console)
   on the bucket to set it public. Their docs are a bit confusing, so I'll paste the config I used below.
7) If you didn't register your domain with CloudFlare, you should go to your registrar and ensure that the DNS settings
   are configured to point to it.
8) In the section where you set up static website hosting for your bucket on S3, all the way at the bottom, there will
   be a URL that looks like `http://ferdysauce.xyz.s3-website-us-east-1.amazonaws.com` (different for your site and
   bucket location of course). Copy that URL.
9) Go to CloudFlare->DNS->Records. Create a `CNAME` from `ferdysauce.xyz`
   to `ferdysauce.xyz.s3-website-us-east-1.amazonaws.com` (replacing as necessary). Ensure you have 'Proxied' set.
10) Go to CloudFlare->SSL/TLS->Overview and ensure 'Flexible' is checked.

You're done! It might take a short amount of time for things to propagate though.

S3 'public' policy below; make sure you update the `Resource` to replace `ferdysauce.xyz` with your bucket.

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::ferdysauce.xyz/*"
        }
    ]
}
```

## Updates to this site

I'm probably not going to do much in the way of updating this. Perhaps VirtualQuery will get sick of this terrible site
and overhaul it to look nicer, maybe he will share the updated version at that time.

If you have an update you'd like to contribute back, feel free to send a PR.
