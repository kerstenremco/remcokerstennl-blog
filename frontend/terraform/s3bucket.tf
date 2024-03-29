resource "aws_s3_bucket" "s3bucket" {
  bucket = "remcokerstennl"

  tags = {
    Project  = "remcokerstennl"
    Environment = "Prod"
  }
}

resource "aws_s3_bucket_public_access_block" "s3bucket" {
  bucket = aws_s3_bucket.s3bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_website_configuration" "s3bucketstatic" {
  bucket = aws_s3_bucket.s3bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "404.html"
  }

  routing_rule {
    condition {
      key_prefix_equals = "docs/"
    }
    redirect {
      replace_key_prefix_with = "documents/"
    }
  }
}

resource "aws_s3_bucket_policy" "allow_access_from_cloudfront" {
  bucket = aws_s3_bucket.s3bucket.id
  policy = data.aws_iam_policy_document.allow_access_from_cloudfront.json
}

resource "aws_s3_bucket_ownership_controls" "s3bucket" {
  bucket = aws_s3_bucket.s3bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

data "aws_iam_policy_document" "allow_access_from_cloudfront" {
  statement {
    principals {
      type        = "*"
      identifiers = ["*"]
    }

    actions = [
      "s3:GetObject"
    ]

    resources = [
      "${aws_s3_bucket.s3bucket.arn}/*"
    ]
  }
}



