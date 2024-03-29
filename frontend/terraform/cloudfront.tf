resource "aws_cloudfront_function" "redirect_old_to_new_blog" {
  name    = "redirect_old_to_new_blog"
  runtime = "cloudfront-js-2.0"
  comment = "Redirect old urls"
  publish = true
  code    = file("${path.module}/redirect.js")
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name              = aws_s3_bucket_website_configuration.s3bucketstatic.website_endpoint
    origin_id                = aws_s3_bucket.s3bucket.id
     custom_origin_config {
      http_port              = "80"
      https_port             = "443"
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  aliases = ["remcokersten.nl", "www.remcokersten.nl"]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = aws_s3_bucket.s3bucket.id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
     function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.redirect_old_to_new_blog.arn
    }
  }

  price_class = "PriceClass_100"


  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  

  tags = {
    Project  = "remcokerstennl"
    Environment = "Prod"
  }

  viewer_certificate {
    acm_certificate_arn = "arn:aws:acm:us-east-1:690695544845:certificate/fb366498-e042-4f73-a36a-c7f5ce252225"
    ssl_support_method = "sni-only"
  }

 
}