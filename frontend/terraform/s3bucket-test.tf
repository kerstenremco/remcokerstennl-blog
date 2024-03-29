resource "aws_s3_bucket" "s3bucket-test" {
  bucket = "remcokerstennl-test"

  tags = {
    Project  = "remcokerstennl"
    Environment = "Test"
  }
}

resource "aws_s3_bucket_public_access_block" "s3bucket-test" {
  bucket = aws_s3_bucket.s3bucket-test.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_website_configuration" "s3bucket-test" {
  bucket = aws_s3_bucket.s3bucket-test.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "404.html"
  }
}

resource "aws_s3_bucket_policy" "allow_access_public" {
  bucket = aws_s3_bucket.s3bucket-test.id
  policy = data.aws_iam_policy_document.allow_access_public.json
}

resource "aws_s3_bucket_ownership_controls" "s3bucket-test" {
  bucket = aws_s3_bucket.s3bucket-test.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

data "aws_iam_policy_document" "allow_access_public" {
  statement {
    principals {
      type        = "*"
      identifiers = ["*"]
    }

    actions = [
      "s3:GetObject"
    ]

    resources = [
      "${aws_s3_bucket.s3bucket-test.arn}/*"
    ]
  }
}