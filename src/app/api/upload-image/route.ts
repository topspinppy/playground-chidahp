import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(process.env.WORDPRESS_API_TOKEN, process.env, 'WORDPRESS_API_TOKEN');
    const { image_data, filename, title, alt_text } = body;

    if (!image_data) {
      return NextResponse.json(
        { error: 'No image data provided' },
        { status: 400 }
      );
    }

    // Validate base64 format
    if (!image_data.startsWith('data:image/')) {
      return NextResponse.json(
        { error: 'Invalid image data format' },
        { status: 400 }
      );
    }

    // Upload to WordPress API using base64
    const wordpressResponse = await fetch(
      'https://api.playground.chidahp.com/wp-json/chidahp-affiliate/v1/upload-image-base64',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.WORDPRESS_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_data: image_data,
          filename: filename || 'uploaded-image.jpg',
          title: title || filename || 'Uploaded Image',
          alt_text: alt_text || filename || 'Uploaded Image',
        }),
      }
    );

    if (!wordpressResponse.ok) {
      const errorData = await wordpressResponse.text();
      console.error('WordPress API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to upload image to WordPress' },
        { status: wordpressResponse.status }
      );
    }

    const wordpressData = await wordpressResponse.json();

    console.log(wordpressData, 'wordpressData');
    // Return the uploaded image URL
    return NextResponse.json({
      success: true,
      url: wordpressData.data.url,
      id: wordpressData.data.attachment_id,
      title: wordpressData.data.title,
      alt_text: wordpressData.data.alt_text,
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}