import { Alert } from 'antd';

class GetInformations {
  apiBase = 'https://conduit.productionready.io/api/';

  async getResource(rest, token) {
    let res;
    if (token) {
      // eslint-disable-next-line no-underscore-dangle
      res = await fetch(`${this.apiBase}${rest}`, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${token}`,
        },
      });
    } else {
      res = await fetch(`${this.apiBase}${rest}`, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      });
    }

    return res;
  }

  errorMessage = (status) => {
    switch (status) {
      case 401:
        return (
          <Alert
            message="Error"
            description="401 Access denied"
            type="error"
            showIcon
          />
        );
      case 403:
        return (
          <Alert
            message="Error"
            description="403 no permission required"
            type="error"
            showIcon
          />
        );
      case 404:
        return (
          <Alert
            message="Error"
            description="404 not found"
            type="error"
            showIcon
          />
        );
      case 'Failed to fetch':
        return (
          <Alert
            message="Error"
            description="Not internet connection"
            type="error"
            showIcon
          />
        );
      default:
        return (
          <Alert
            message="Error"
            description={`${status} Unknown error`}
            type="error"
            showIcon
          />
        );
    }
  };

  async getArticles(pageSize, offset, token) {
    let error = false;
    let body = 0;
    const res = await this.getResource(
      `articles?limit=${pageSize}&offset=${offset}`, token
    ).catch((err) => {
      error = { message: this.errorMessage(err.message) };
    });
    if (!error) {
      body = res.json();
      if (!res.ok) {
        error = { message: this.errorMessage(res.status) };
      }
    }
    return error || body;
  }

  async setRegistration(data) {
    const res = await fetch(`${this.apiBase}users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    });
    const body = res.json();
    return body;
  }

  async setAuthentication(data) {
    const res = await fetch(`${this.apiBase}users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    });
    const body = res.json();
    return body;
  }

  async getArticle(slug, token) {
    let error = false;
    let body = 0;
    const res = await this.getResource(`articles/${slug}`, token).catch((err) => {
      error = { message: this.errorMessage(err.message) };
    });
    if (!error) {
      body = res.json();
      if (!res.ok) {
        error = { message: this.errorMessage(res.status) };
      }
    }
    return error || body;
  }

  async getProfile(username) {
    let error = false;
    const res = await this.getResource(`profiles/${username}`);

    if (!error && res.status !== 200) {
      error = true;
    }
    return error;
  }

  async setProfile(data, token) {
    const res = await fetch(`${this.apiBase}user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(data),
    });

    const body = res.json();

    return body;
  }

  async setArticle(data, token) {
    let body;
    let error = false;
    const res = await fetch(`${this.apiBase}articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(data),
    }).catch((err) => {
      error = { message: this.errorMessage(err.message) };
    });
    if (!error) {
      body = res.json();
      if (!res.ok) {
        error = { message: this.errorMessage(res.status) };
      }
    }
    return error || body;
  }

  async deleteArticle(slug, token) {
    await fetch(`${this.apiBase}articles/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
    });
  }

  async unfavoriteArticle(slug, token) {
    await fetch(`${this.apiBase}articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
    });
  }

  async favoriteArticle(slug, token) {
    await fetch(`${this.apiBase}articles/${slug}/favorite`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
    });
  }

  async updateArticle(data, token, slug) {
    let body;
    let error = false;
    const res = await fetch(`${this.apiBase}articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(data),
    }).catch((err) => {
      error = { message: this.errorMessage(err.message) };
    });
    if (!error) {
      body = res.json();
      if (!res.ok) {
        error = { message: this.errorMessage(res.status) };
      }
    }
    return error || body;
  }
}

const informs = new GetInformations();

export default informs;
