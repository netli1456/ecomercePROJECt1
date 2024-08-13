import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import AdbIcon from '@mui/icons-material/Adb';
import AppleIcon from '@mui/icons-material/Apple';
import LocalMallIcon from '@mui/icons-material/LocalMall';

function Footer() {
  return (
    <div className="serchsmallBg  p-4" style={{overflow:"hidden"}}>
      <Container>
        <Row>
          <Col md={6}>
            <div className="">
              <p>Help</p>
              <div
                style={{ opacity: '0.6', fontSize: '14px' }}
                className="d-flex align-items-center flex-wrap gap-1 mb-3"
              >
                <Link className="text-decoration-none text-black">
                  Help Center,
                </Link>
                <Link className="text-decoration-none text-black">
                  Disputes & Reports,
                </Link>
                <Link className="text-decoration-none text-black">
                  Buyer Protection,
                </Link>
                <Link className="text-decoration-none text-black">
                  Report IPR infringement,
                </Link>
                <Link className="text-decoration-none text-black">
                  Regulated Information,
                </Link>
                <Link className="text-decoration-none text-black">
                  {' '}
                  Integrity Compliance
                </Link>
              </div>
              <div>
                <p>Browse by Category</p>
                <div style={{ opacity: '0.6', fontSize: '14px' }}>
                  <Link className="text-decoration-none text-black">
                    All Popular,
                  </Link>
                  <Link className="text-decoration-none text-black">
                    Product,
                  </Link>
                  <Link className="text-decoration-none text-black">
                    Promotion,
                  </Link>
                  <Link className="text-decoration-none text-black">
                    Low Price,{' '}
                  </Link>
                  <Link className="text-decoration-none text-black">
                    Great Value,
                  </Link>
                  <Link className="text-decoration-none text-black">
                    Reviews,
                  </Link>
                  <Link className="text-decoration-none text-black">Blog,</Link>
                  <Link className="text-decoration-none text-black">
                    Seller Portal,
                  </Link>
                  <Link className="text-decoration-none text-black">
                    BLACK FRIDAY,
                  </Link>
                  <Link className="text-decoration-none text-black">
                    AliExpress Assistant
                  </Link>
                </div>
              </div>
            </div>
            
          </Col>
          <Col md={6}>
            <div>
              <p>AloServices Multi-Language Sites</p>
              <div
                style={{ opacity: '0.6', fontSize: '14px' }}
                className="d-flex align-items-center flex-wrap gap-1 mb-3"
              >
                <Link className="text-decoration-none text-black">
                  {' '}
                  Russian,
                </Link>
                <Link className="text-decoration-none text-black">
                  Portuguese,
                </Link>
                <Link className="text-decoration-none text-black">
                  Spanish,{' '}
                </Link>
                <Link className="text-decoration-none text-black">French,</Link>
                <Link className="text-decoration-none text-black">
                  {' '}
                  German,{' '}
                </Link>
                <Link className="text-decoration-none text-black">
                  Italian,{' '}
                </Link>
                <Link className="text-decoration-none text-black"> Dutch,</Link>
                <Link className="text-decoration-none text-black">
                  Turkish,{' '}
                </Link>
                <Link className="text-decoration-none text-black">
                  {' '}
                  Japanese,{' '}
                </Link>
                <Link className="text-decoration-none text-black">
                  {' '}
                  Korean,
                </Link>
                <Link className="text-decoration-none text-black">Thai, </Link>
                <Link className="text-decoration-none text-black">
                  {' '}
                  Vietnamese,
                </Link>
                <Link className="text-decoration-none text-black">
                  {' '}
                  Arabic,
                </Link>
                <Link className="text-decoration-none text-black">
                  {' '}
                  Hebrew,
                </Link>
                <Link className="text-decoration-none text-black"> Polish</Link>
              </div>
              <div>
                <p>AloServices Group</p>
                <div
                  style={{ opacity: '0.6', fontSize: '14px' }}
                  className="d-flex align-items-center flex-wrap gap-1"
                >
                  <Link className="text-decoration-none text-black">
                    Alobaba Group Website,{' '}
                  </Link>
                  <Link className="text-decoration-none text-black">
                    {' '}
                    AloExpress,
                  </Link>
                  <Link className="text-decoration-none text-black">
                    Alotrain,
                  </Link>
                  <Link className="text-decoration-none text-black">
                    Alopay,{' '}
                  </Link>
                  <Link className="text-decoration-none text-black">
                    Fliggy,
                  </Link>
                  <Link className="text-decoration-none text-black">
                    Alo Cloud,
                  </Link>
                  <Link className="text-decoration-none text-black">
                    Alo International,
                  </Link>
                  <Link className="text-decoration-none text-black">
                    AloTelecom,
                  </Link>
                  <Link className="text-decoration-none text-black">
                    DingTalk,
                  </Link>
                  <Link className="text-decoration-none text-black">
                    AloExpress Assistant
                  </Link>
                  <Link className="text-decoration-none text-black">1688</Link>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <div  className="d-flex align-items-center my-3 flex-wrap gap-3">
              <div className='greenBg px-2'>
              <AdbIcon/>
                <strong>Google Play</strong>
              </div>
              <div className='greyBg px-2'>
              <AppleIcon/>
                <strong>App Store</strong>
              </div>
              <div className='blackBg px-2'>
              <LocalMallIcon/>
                <strong>AppGallery</strong>
              </div>
             
            </div>
      </Container>
    </div>
  );
}

export default Footer;
