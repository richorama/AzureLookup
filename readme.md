# Azure Datacenter Lookup

This application looks up the IP address of the domain name provided, and matches it against the published list of IP address ranges used by the compute services in Microsoft Azure Datacenters.

* [AWS IP Ranges](http://docs.aws.amazon.com/general/latest/gr/aws-ip-ranges.html#aws-ip-download)
* [Azure IP Ranges](https://www.microsoft.com/en-gb/download/details.aspx?id=41653)

The application is hosted here:

[http://azurelookup.azurewebsites.net](http://azurelookup.azurewebsites.net)

You can initialise the app with a domain name or ip address like this:

[http://azurelookup.azurewebsites.net/#www.microsoft.com](http://azurelookup.azurewebsites.net/#www.microsoft.com)

You can call the api directly to retrieve the name of the datacenter like this:

[http://azurelookup.azurewebsites.net/www.microsoft.com](http://azurelookup.azurewebsites.net/www.microsoft.com)

## Running the application

The application is designed to run in Azure Websites.

You can also run it on the command line like this, which will start the web server on port 8080:

```
$ node server
```

The application required node.js to be installed.

## License

MIT
